import axios from "axios";
import { normalize, schema } from "normalizr";
import { merge, cloneDeep, isEqual } from "lodash";

const mappingServer = () => "http://localhost:8080/v2";

export const dePlaneName = bending =>
  bending == 'true' ? "bending": "non-bending";

// initial state
export const initialState = {};

export const assertDE = (state, { deid, bending }) => {
  let newState = cloneDeep(state);
  const planeName = dePlaneName(bending);
  if (!state.des || !state.des[deid] || !state.des[deid][planeName]) {
    let de = {
      des: {
        [deid]: {
          id: { deid: deid },
          [planeName]: {
            isFetchingDualSampas: false
          }
        }
      }
    };
    merge(newState, de);
  }
  return newState;
};

const fetch = (what, state, id, fetching, newdata) => {
  let s = assertDE(state, id);
  const dep = selectors.deplane(s, id);
  dep["isFetching" + what] = fetching;
  if (newdata !== undefined) {
    merge(dep, newdata);
  }
  return s;
};

// reducer
export default (state = initialState, action) => {
  if (state === undefined) {
    return initialState;
  }

  if (action.type == "FETCH_DUALSAMPAS") {
    return fetch("DualSampas", state, action.payload.id, true);
  }
  if (action.type == "ERROR_DUALSAMPAS") {
    return fetch("DualSampas", state, action.payload.id, false);
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
            id: { deid: dep.deid, bending: dep.bending, dsid: entity.id }
          }
        )
    });
    const normalizedData = normalize(action.payload.response, [dualsampa]);
    const newdata = {
      dualsampas: normalizedData.entities.dualsampas,
      dsids: normalizedData.result
    };
    return fetch("DualSampas", state, action.payload.id, false, newdata);
  }

  if (action.type == "FETCH_DEPLANE") {
    return fetch("DePlane", state, action.payload.id, true);
  }
  if (action.type == "ERROR_DEPLANE") {
    return fetch("DePlane", state, action.payload.id, false);
  }

  if (action.type == "RECEIVE_DEPLANE") {
    const id = action.payload.id;
    const { id: y, bending: x, ...object } = action.payload.response;
    const newdata = { id, ...object };
    return fetch("DePlane", state, action.payload.id, false, newdata);
  }
  return state;
};

// action creators
export const actions = {
  fetchDePlane: id => {
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
  },
  fetchDualSampas: id => {
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
  }
};

// selectors
export const selectors = {
  deplane: (state, id) => {
    if (state.des === undefined) {
      return undefined;
    }
    if (state.des && state.des[id.deid]) {
      return state.des[id.deid][dePlaneName(id.bending)];
    }
    return undefined;
  },
  dualsampas: (state, id) => {
    if (state.des === undefined) {
      return undefined;
    }
    if (
      state.des &&
      state.des[id.deid] &&
      state.des[id.deid][dePlaneName(id.bending)].dualsampas
    ) {
      return state.des[id.deid][dePlaneName(id.bending)].dualsampas;
    }
    return undefined;
  },
  isFetchingDualSampas: (state, id) => {
    return selectors.hasDePlane(state, id)
      ? selectors.deplane(state, id).isFetchingDualSampas
      : false;
  },
  isFetchingDePlane: (state, id) => {
    return selectors.hasDePlane(state, id)
      ? selectors.deplane(state, id).isFetchingDePlane
      : false;
  },
  hasDePlane: (state, id) => {
    const dep = selectors.deplane(state, id);
    if (dep !== undefined) {
      return true;
    }
    return false;
  },
  hasDe: (state, deid) => {
    return (
      selectors.hasDePlane(state, { deid, bending: true }) &&
      selectors.hasDePlane(state, { deid, bending: false })
    );
  }
};
