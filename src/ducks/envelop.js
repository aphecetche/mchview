import { normalize, schema } from "normalizr";
import { merge, cloneDeep } from "lodash";
import * as categories from "../categories";
import de100 from "../store/detection-element-100-all-dual-sampas.json";

const mappingServer = () => "http://localhost:8080/v2";

export const dePlaneName = bending => {
  return bending == "true" || bending === true ? "bending" : "non-bending";
};

// initial state
// export const initialState = {};
export const initialState = { ...de100 };

export const assertDePlaneState = (state, { deid, bending }) => {
  let newState = cloneDeep(state);
  const planeName = dePlaneName(bending);
  if (!state.des || !state.des[deid] || !state.des[deid][planeName]) {
    let de = {
      des: {
        [deid]: {
          id: { deid: deid },
          [planeName]: {
            isLoading: false,
            dualsampas: {
              isLoading: false
            }
          }
        }
      }
    };
    merge(newState, de);
  }
  return newState;
};

const requestSent = (state, id) => {
  let s = assertDePlaneState(state, id);
  const envelop = selectors.envelop(s, id);
  envelop["isLoading"] = true;
  return s;
};

const requestFailed = (state, id) => {
  let s = assertDePlaneState(state, id);
  const envelop = selectors.envelop(s, id);
  envelop["isLoading"] = false;
  return s;
};

const receive = (state, id, newdata) => {
  let s = assertDePlaneState(state, id);
  const envelop = selectors.envelop(s, id);
  envelop["isLoading"] = false;
  if (newdata !== undefined) {
    merge(envelop, newdata);
  }
  return s;
};

// reducer
export default (state = initialState, action) => {
  if (state === undefined) {
    return initialState;
  }

  if (action.type == "FETCH_DUALSAMPAS") {
    return requestSent(state, action.payload.id);
  }
  if (action.type == "ERROR_DUALSAMPAS") {
    return requestFailed(state, action.payload.id);
  }

  if (action.type == "RECEIVE_DUALSAMPAS") {
    const dep = action.payload.id;
    const dualsampa = new schema.Entity("dualsampas", undefined, {
      // append the deid to the dualsampa object
      processStrategy: entity =>
        Object.assign(
          {},
          {
            ...entity,
            id: { deid: dep.deid, bending: dep.bending, dsid: entity.id },
            value: entity.id
          }
        )
    });
    const normalizedData = normalize(action.payload.response, [dualsampa]);
    const newdata = {
      dualsampas: normalizedData.entities.dualsampas,
      dsids: normalizedData.result
    };
    return receive(state, action.payload.id, newdata);
  }

  if (action.type == "FETCH_DEPLANE") {
    return requestSent(state, action.payload.id);
  }
  if (action.type == "ERROR_DEPLANE") {
    return requestFailed(state, action.payload.id);
  }

  if (action.type == "RECEIVE_DEPLANE") {
    const id = action.payload.id;
    const { id: y, bending: x, ...object } = action.payload.response;
    const newdata = { id, ...object };
    return receive(state, action.payload.id, newdata);
  }
  return state;
};

// action creators
export const actions = {
  fetch: id => {
    switch (categories.whatis(id)) {
      case categories.de:
        return [
          actions.fetch({ deid: id.deid, bending: true }),
          actions.fetch({ deid: id.deid, bending: false })
        ];
      case categories.deplane:
        return {
          type: "DEPLANE",
          payload: {
            request: {
              url:
                mappingServer() +
                "/degeo?deid=" +
                id.deid +
                "&bending=" +
                id.bending,
              id
            }
          }
        };
      case categories.ds:
        console.log(
          "envelop.js fetch id=",
          id,
          categories.describe(id),
          categories.isSpecific(id)
        );
        if (categories.isSpecific(id)) {
          throw "not implemented for a given dsid=" + JSON.stringify(id);
        }
        if (!categories.hasBending(id)) {
          return [
            actions.fetch({ deid: id.deid, bending: true }),
            actions.fetch({ deid: id.deid, bending: false }),
            actions.fetch({ deid: id.deid, bending: true, dsid: null }),
            actions.fetch({ deid: id.deid, bending: false, dsid: null })
          ];
        }
        return {
          type: "DUALSAMPAS",
          payload: {
            request: {
              url:
                mappingServer() +
                "/dualsampas?deid=" +
                id.deid +
                "&bending=" +
                id.bending,
              id
            }
          }
        };
      default:
        throw "no action known for id=" + JSON.stringify(id);
    }
  }
};

// selectors
export const selectors = {
  envelop: (state, id) => {
    if (state.des === undefined) {
      return undefined;
    }
    switch (categories.whatis(id)) {
      case categories.de:
        if (state.des) {
          return state.des[id.deid];
        }
        return undefined;
      case categories.deplane:
        if (state.des && state.des[id.deid]) {
          return state.des[id.deid][dePlaneName(id.bending)];
        }
        return undefined;
      case categories.ds:
        if (
          state.des &&
          state.des[id.deid] &&
          state.des[id.deid][dePlaneName(id.bending)] &&
          state.des[id.deid][dePlaneName(id.bending)].dualsampas
        ) {
          return state.des[id.deid][dePlaneName(id.bending)].dualsampas;
        }
        return undefined;
      default:
        throw "category for " + JSON.stringify(id) + " not handled (yet?)";
    }
  },
  isLoading: (state, id) => {
    switch (categories.whatis(id)) {
      case categories.de:
        return (
          selectors.isLoading(state, { deid: id.deid, bending: false }) ||
          selectors.isLoading(state, { deid: id.deid, bending: true })
        );
    }
    const envelop = selectors.envelop(state, id);
    if (envelop) {
      return envelop.isLoading;
    }
    return false;
  }
};
