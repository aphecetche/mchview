import axios from "axios";
import { normalize, schema } from "normalizr";
import { merge, cloneDeep, isEqual } from "lodash";

const mappingServer = () => "http://localhost:8080/v2";

const bendingPlaneName = bending => (bending ? "bending" : "non-bending");

// initial state
export const initialState = {};

export const assertDE = (state, { deid, bending }) => {
  let newState = cloneDeep(state);
  if (!state.des || !state.des[deid] || !state.des[deid][bending]) {
    let de = {
      des: {
        [deid]: {
          id: { deid: deid },
          [bendingPlaneName(bending)]: {
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

  // fetchDualSampas: (deid, bending) => {
  //   const dualsampa = new schema.Entity("dualsampas", undefined, {
  //     // append the deid to the dualsampa object
  //     processStrategy: entity =>
  //       Object.assign({}, { ...entity, id: { deid, bending, dsid: entity.id } })
  //   });
  //   let url =
  //     mappingServer() + "/dualsampas?deid=" + deid + "&bending=" + bending;
  //   return dispatch => {
  //     dispatch(actions.requestDualSampas(deid, bending));
  //     return axios
  //       .get(url)
  //       .then(response => {
  //         let normalizedData = {};
  //         if (
  //           !(
  //             Object.entries(response.data).length === 0 &&
  //             response.data.construtor === Object
  //           )
  //         ) {
  //           // ensure we are not normalizing and empty data
  //           normalizedData = normalize(response.data, [dualsampa]);
  //         } else {
  //           return dispatch(
  //             actions.failedToFetchDualSampas(
  //               "got empty dualsampa data for deid" + deid
  //             )
  //           );
  //         }
  //         return dispatch(
  //           actions.receiveDualSampas(deid, bending, {
  //             dualsampas: normalizedData.entities.dualsampas,
  //             dsids: normalizedData.result
  //           })
  //         );
  //       })
  //       .catch(error => {
  //         return dispatch(actions.failedToFetchDualSampas(error));
  //       });
  //   };
  // },
};

// selectors
export const selectors = {
  deplane: (state, id) => {
    if (state.des === undefined) {
      return undefined;
    }
    if (state.des && state.des[id.deid]) {
      return state.des[id.deid][bendingPlaneName(id.bending)];
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
    const dp = selectors.deplane(state, id);
    if (dp !== undefined) {
      return true;
      // return dp.vertices !== undefined;
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
