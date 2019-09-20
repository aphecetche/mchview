import axios from "axios";
import { normalize, schema } from "normalizr";
import { merge, cloneDeep, isEqual } from "lodash";

const mappingServer = () => "http://localhost:8080";

const mappingAPI = "http://localhost:8080/v2";

// action types
export const types = {
  FETCH_DUALSAMPAS_REQUEST: "ENVELOPS/FETCH_DUALSAMPAS_REQUEST",
  FETCH_DUALSAMPAS_FAILURE: "ENVELOPS/FETCH_DUALSAMPAS_FAILURE",
  FETCH_DUALSAMPAS_SUCCESS: "ENVELOPS/FETCH_DUALSAMPAS_SUCCESS"
};

const bendingPlaneName = bending => (bending ? "bending" : "non-bending");

// initial state
export const initialState = {};

export const assertDE = (state, deid, bending) => {
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

// reducer
export default (state = initialState, action) => {
  if (state === undefined) {
    return initialState;
  }
  if (action.type === types.FETCH_DUALSAMPAS_REQUEST) {
    let s = assertDE(state, action.payload.deid, action.payload.bending);
    selectors.deplane(
      s,
      action.payload.deid,
      action.payload.bending
    ).isFetchingDualSampas = true;
    return s;
  }
  if (action.type === types.FETCH_DUALSAMPAS_FAILURE) {
    let s = assertDE(state, action.payload.deid, action.payload.bending);
    selectors.deplane(
      s,
      action.payload.deid,
      action.payload.bending
    ).fetchingDualSampasFailed = action.payload.error;
    return state;
  }
  if (action.type === types.FETCH_DUALSAMPAS_SUCCESS) {
    let s = assertDE(state, action.payload.deid, action.payload.bending);
    merge(
      selectors.deplane(s, action.payload.deid, action.payload.bending),
      action.payload.json
    );
    selectors.deplane(
      s,
      action.payload.deid,
      action.payload.bending
    ).isFetchingDualSampas = false;
    return s;
  }
  if (action.type == "FETCH_DEPLANE") {
    let s = assertDE(state, action.payload.deid, action.payload.bending);
    selectors.deplane(
      s,
      action.payload.deid,
      action.payload.bending
    ).isFetchingDePlane = true;
    return s;
  }
  if (action.type == "ERROR_DEPLANE") {
    let s = assertDE(state, action.payload.deid, action.payload.bending);
    selectors.deplane(
      s,
      action.payload.deid,
      action.payload.bending
    ).isFetchingDePlane = false;
    return state;
  }
  if (action.type == "RECEIVE_DEPLANE") {
    const id = action.payload.response.id;
    const { deid, bending } = id;
    console.log(id, deid, bending);
    let s = assertDE(state, deid, bending);
    merge(selectors.deplane(s, deid, bending), action.payload.response);
    selectors.deplane(s, deid, bending).isFetchingDePlane = false;
    return s;
  }
  return state;
};

// action creators
export const actions = {
  fetchDePlane: (deid, bending) => {
    return {
      type: "DEPLANE",
      payload: {
        request: {
          url: mappingAPI + "/degeo?deid=" + deid + "&bending=" + bending,
          deid,
          bending
        }
      }
    };
  },
  fetchDualSampas: (deid, bending) => {
    const dualsampa = new schema.Entity("dualsampas", undefined, {
      // append the deid to the dualsampa object
      processStrategy: entity =>
        Object.assign({}, { ...entity, id: { deid, bending, dsid: entity.id } })
    });
    let url =
      mappingServer() + "/v2/dualsampas?deid=" + deid + "&bending=" + bending;
    return dispatch => {
      dispatch(actions.requestDualSampas(deid, bending));
      return axios
        .get(url)
        .then(response => {
          let normalizedData = {};
          if (
            !(
              Object.entries(response.data).length === 0 &&
              response.data.construtor === Object
            )
          ) {
            // ensure we are not normalizing and empty data
            normalizedData = normalize(response.data, [dualsampa]);
          } else {
            return dispatch(
              actions.failedToFetchDualSampas(
                "got empty dualsampa data for deid" + deid
              )
            );
          }
          return dispatch(
            actions.receiveDualSampas(deid, bending, {
              dualsampas: normalizedData.entities.dualsampas,
              dsids: normalizedData.result
            })
          );
        })
        .catch(error => {
          return dispatch(actions.failedToFetchDualSampas(error));
        });
    };
  },
  requestDualSampas: (deid, bending) => ({
    type: types.FETCH_DUALSAMPAS_REQUEST,
    payload: {
      deid: deid,
      bending: bending
    }
  }),
  receiveDualSampas: (deid, bending, json) => ({
    type: types.FETCH_DUALSAMPAS_SUCCESS,
    payload: {
      deid: deid,
      bending: bending,
      json: json
    }
  }),
  failedToFetchDualSampas: error => ({
    type: types.FETCH_DUALSAMPAS_FAILURE,
    payload: {
      error: error
    }
  })
};

// selectors
export const selectors = {
  deplane: (state, deid, bending) => {
    if (state.des === undefined) {
      return undefined;
    }
    if (state.des && state.des[deid]) {
      return state.des[deid][bendingPlaneName(bending)];
    }
    return undefined;
  },
  isFetchingDualSampas: (state, deid, bending) => {
    return selectors.hasDePlane(state, deid, bending)
      ? selectors.deplane(state, deid, bending).isFetchingDualSampas
      : false;
  },
  isFetchingDePlane: (state, deid, bending) => {
    return selectors.hasDePlane(state, deid, bending)
      ? selectors.deplane(state, deid, bending).isFetchingDePlane
      : false;
  },
  hasDePlane: (state, deid, bending) => {
    const dp = selectors.deplane(state, deid, bending);
    if (dp !== undefined) {
      return true;
      // return dp.vertices !== undefined;
    }
    return false;
  },
  hasDe: (state, deid) => {
    return (
      selectors.hasDePlane(state, deid, true) &&
      selectors.hasDePlane(state, deid, false)
    );
  }
};
