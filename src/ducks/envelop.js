import axios from "axios";
import { normalize, schema } from "normalizr";
import { merge, cloneDeep } from "lodash";

const mappingServer = () => "http://localhost:8080";

// action types
export const types = {
  FETCH_DUALSAMPAS_REQUEST: "ENVELOPS/FETCH_DUALSAMPAS_REQUEST",
  FETCH_DUALSAMPAS_FAILURE: "ENVELOPS/FETCH_DUALSAMPAS_FAILURE",
  FETCH_DUALSAMPAS_SUCCESS: "ENVELOPS/FETCH_DUALSAMPAS_SUCCESS",
  FETCH_DE_REQUEST: "ENVELOPS/FETCH_DE_REQUEST",
  FETCH_DE_FAILURE: "ENVELOPS/FETCH_DE_FAILURE",
  FETCH_DE_SUCCESS: "ENVELOPS/FETCH_DE_SUCCESS"
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
          id: deid,
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
    selectors.plane(
      s,
      action.payload.deid,
      action.payload.bending
    ).isFetchingDualSampas = true;
    return s;
  }
  if (action.type === types.FETCH_DUALSAMPAS_FAILURE) {
    let s = assertDE(state, action.payload.deid, action.payload.bending);
    selectors.plane(
      s,
      action.payload.deid,
      action.payload.bending
    ).fetchingDualSampasFailed = action.payload.error;
    return state;
  }
  if (action.type === types.FETCH_DUALSAMPAS_SUCCESS) {
    let s = assertDE(state, action.payload.deid, action.payload.bending);
    merge(
      selectors.plane(s, action.payload.deid, action.payload.bending),
      action.payload.json
    );
    selectors.plane(
      s,
      action.payload.deid,
      action.payload.bending
    ).isFetchingDualSampas = false;
    return s;
  }
  if (action.type === types.FETCH_DE_REQUEST) {
    let s = assertDE(state, action.payload.deid, action.payload.bending);
    selectors.plane(
      s,
      action.payload.deid,
      action.payload.bending
    ).isFetchingDE = true;
    return s;
  }
  if (action.type === types.FETCH_DE_FAILURE) {
    let s = assertDE(state, action.payload.deid, action.payload.bending);
    selectors.plane(
      s,
      action.payload.deid,
      action.payload.bending
    ).fetchingDEFailed = action.payload.error;
    return state;
  }
  if (action.type === types.FETCH_DE_SUCCESS) {
    let s = assertDE(state, action.payload.deid, action.payload.bending);
    merge(
      selectors.plane(s, action.payload.deid, action.payload.bending),
      action.payload.json
    );
    selectors.plane(
      s,
      action.payload.deid,
      action.payload.bending
    ).isFetchingDE = false;
    return s;
  }
  return state;
};

const axiosDE = (dispatch, deid, bending) => {
  let url = mappingServer() + "/v2/degeo?deid=" + deid + "&bending=" + bending;
  return axios
    .get(url)
    .then(response => {
      if (
        Object.entries(response.data).length === 0 &&
        response.data.construtor === Object
      ) {
        return dispatch(
          actions.failedToFetchDE("got empty de data for deid" + deid)
        );
      }
      return dispatch(actions.receiveDE(deid, bending, response.data));
    })
    .catch(error => {
      return dispatch(actions.failedToFetchDE(error));
    });
};

// action creators
export const actions = {
  fetchDE: (deid, bending) => {
    return dispatch => {
      dispatch(actions.requestDE(deid, bending));
      return axiosDE(dispatch, deid, bending);
    };
  },
  fetchDualSampas: (deid, bending) => {
    const dualsampa = new schema.Entity("dualsampas", undefined, {
      // append the deid to the dualsampa object
      processStrategy: entity => Object.assign({}, { ...entity, deid: deid })
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
  requestDE: (deid, bending) => ({
    type: types.FETCH_DE_REQUEST,
    payload: {
      deid: deid,
      bending: bending
    }
  }),
  requestDualSampas: (deid, bending) => ({
    type: types.FETCH_DUALSAMPAS_REQUEST,
    payload: {
      deid: deid,
      bending: bending
    }
  }),
  receiveDE: (deid, bending, json) => ({
    type: types.FETCH_DE_SUCCESS,
    payload: {
      deid: deid,
      bending: bending,
      json: json
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
  failedToFetchDE: error => ({
    type: types.FETCH_DE_FAILURE,
    payload: {
      error: error
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
  plane: (state, deid, bending) => {
    if (state.des === undefined) {
      return undefined;
    }
    if (state.des && state.des[deid]) {
      return state.des[deid][bendingPlaneName(bending)];
    }
    return undefined;
  },
  isFetchingDualSampas: (state, deid, bending) => {
    return selectors.has(state, deid, bending)
      ? selectors.plane(state, deid, bending).isFetchingDualSampas
      : false;
  },
  isFetchingDE: (state, deid, bending) => {
    return selectors.has(state, deid, bending)
      ? selectors.plane(state, deid, bending).isFetchingDE
      : false;
  },
  has: (state, deid, bending) =>
    selectors.plane(state, deid, bending) !== undefined ? true : false
};
