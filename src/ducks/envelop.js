import axios from "axios";
import { normalize, schema } from "normalizr";

// action types
export const types = {
  FETCH_DUALSAMPAS_REQUEST: "ENVELOPS/FETCH_DUALSAMPAS_REQUEST",
  FETCH_DUALSAMPAS_FAILURE: "ENVELOPS/FETCH_DUALSAMPAS_FAILURE",
  FETCH_DUALSAMPAS_SUCCESS: "ENVELOPS/FETCH_DUALSAMPAS_SUCCESS"
};

const bendingPlaneName = bending => (bending ? "bending" : "non-bending");

// initial state
export const initialState = {
  des: {
    706: {
      id: 706,
      bending: {
        isFetching: true,
        x: 0,
        y: 0,
        sx: 80,
        sy: 40,
        vertices: [
          { x: -40, y: 20 },
          { x: -40, y: -20 },
          { x: 40, y: -20 },
          { x: 40, y: 20 },
          { x: -40, y: 20 }
        ]
      }
    },
    819: {
      id: 819,
      "non-bending": {
        isFetching: false,
        x: -4.000000330961484e-9,
        y: 0,
        sx: 79.999999992,
        sy: 40,
        vertices: [
          {
            x: -40,
            y: 20
          },
          {
            x: -40,
            y: -20
          },
          {
            x: 39.999999992,
            y: -20
          },
          {
            x: 39.999999992,
            y: 20
          },
          {
            x: -40,
            y: 20
          }
        ]
      }
    }
  }
};

export const assertDE = (state, deid, bending) => {
  if (!state.des || !state.des[deid] || !state.des[deid][bending]) {
    return {
      ...state,
      des: {
        [deid]: {
          id: deid,
          [bendingPlaneName(bending)]: {
            isFetching: false
          }
        }
      }
    };
  }
  return Object.assign({}, state);
};

// reducer
export default (state = initialState, action) => {
  if (state === undefined) {
    return initialState;
  }
  if (action.type === types.FETCH_DUALSAMPAS_REQUEST) {
    let s = assertDE(action.payload.deid, action.payload.bending);
    s.des[action.payload.deid][action.payload.bending].isFetching = true;
    return s;
  }
  if (action.type === types.FETCH_DUALSAMPAS_FAILURE) {
    console.log("ERROR" + action.payload.error);
    return state;
  }
  if (action.type === types.FETCH_DUALSAMPAS_SUCCESS) {
    let s = assertDE(action.payload.deid, action.payload.bending);
    s.des[action.payload.deid][action.payload.bending] = action.payload.json;
    return s;
  }
  return state;
};

// action creators
export const actions = {
  fetchDualSampas: (deid, bending) => {
    const dualsampa = new schema.Entity("dualsampas", undefined, {
      // convert local id to some global id using the deid
      idAttribute: value => deid + "-" + value.id,
      // append the deid to the dualsampa object
      processStrategy: entity => Object.assign({}, { ...entity, deid: deid })
    });
    let url =
      "http://localhost:8080/v2/dualsampas?deid=" +
      deid +
      "&bending=" +
      bending;
    return dispatch => {
      dispatch(actions.requestDualSampas(deid, bending));
      return axios
        .get(url)
        .then(response => {
          let normalizedData = {};
          if (
            Object.entries(response.data).length === 0 &&
            response.data.construtor === Object
          ) {
            // ensure we are not normalizing and empty data
            normalizedData = normalize(response.data, [dualsampa]);
          }
          dispatch(actions.receiveDualSampas(deid, bending, normalizedData));
        })
        .catch(error => {
          dispatch(actions.failedToFetchDualSampas(error));
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
  plane: (state, deid, bending) => {
    if (state.des && state.des[deid]) {
      return state.des[deid][bendingPlaneName(bending)];
    }
    return undefined;
  },
  isFetching: (state, deid, bending) => {
    return selectors.has(state, deid, bending)
      ? selectors.plane(state, deid, bending).isFetching
      : false;
  },
  has: (state, deid, bending) =>
    selectors.plane(state, deid, bending) !== undefined ? true : false,
  degeo: (state, deid, bending) => selectors.plane(state, deid, bending)
};
