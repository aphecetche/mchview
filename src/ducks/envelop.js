import axios from "axios";
import { normalize, schema } from "normalizr";
import { merge, cloneDeep } from "lodash";
import { isValidDeId } from "../categories";

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
          id: { deid: deid },
          [bendingPlaneName(bending)]: {
            isFetchingDualSampas: false,
            isFetchingDe: false
          }
        }
      }
    };
    merge(newState, de);
  }
  return newState;
};

const fetch = (state, { deid, bending }, what) => {
  let s = assertDE(state, deid, bending);
  selectors.deplane(s, deid, bending)["isFetching" + what] = true;
  return state;
};

const receive = (state, { deid, bending }, what, data) => {
  let s = assertDE(state, deid, bending);
  merge(selectors.deplane(s, deid, bending), data);
  selectors.deplane(s, deid, bending)["isFetching" + what] = false;
  return s;
};

// reducer
export default (state = initialState, action) => {
  if (state === undefined) {
    return initialState;
  }
  if (action.type === types.FETCH_DUALSAMPAS_REQUEST) {
    return fetch(state, action.payload.request.params, "DualSampas");
  }
  if (action.type === types.FETCH_DUALSAMPAS_FAILURE) {
    console.error("FETCH_DUALSAMPAS_FAILURE: ", action.error);
    return state;
  }
  if (action.type === types.FETCH_DUALSAMPAS_SUCCESS) {
    return receive(
      state,
      action.payload.data.id,
      "DualSampas",
      action.payload.data
    );
  }
  if (action.type === types.FETCH_DE_REQUEST) {
    return fetch(state, action.payload.request.params, "De");
  }
  if (action.type === types.FETCH_DE_FAILURE) {
    console.error("FETCH_DE_FAILURE: ", action.error);
    return state;
  }
  if (action.type === types.FETCH_DE_SUCCESS) {
    return receive(state, action.payload.data.id, "De", action.payload.data);
  }
  return state;
};

// action creators

export const actions = {
  fetchDE: (deid, bending) => {
    if (!isValidDeId(deid)) {
      return {
        type: types.FETCH_DE_FAILURE,
        error: {
          message: "deid " + deid + " is not a valid detection element id"
        }
      };
    }
    return {
      types: [
        types.FETCH_DE_REQUEST,
        types.FETCH_DE_SUCCESS,
        types.FETCH_DE_FAILURE
      ],
      payload: {
        request: {
          url: "/degeo",
          params: {
            deid,
            bending
          },
          transformResponse: data => {
            return {
              ...data,
              id: { deid: data.id, bending }
            };
          }
        }
      }
    };
  },
  fetchDualSampas: (deid, bending) => {
    if (!isValidDeId(deid)) {
      return {
        type: types.FETCH_DE_FAILURE,
        error: {
          message: "deid " + deid + " is not a valid detection element id"
        }
      };
    }
    return {
      types: [
        types.FETCH_DUALSAMPAS_REQUEST,
        types.FETCH_DUALSAMPAS_SUCCESS,
        types.FETCH_DUALSAMPAS_FAILURE
      ],
      payload: {
        request: {
          url: "/dualsampas",
          params: {
            deid,
            bending
          },
          transformResponse: data => {
            const dualsampa = new schema.Entity("dualsampas", undefined, {
              // append the deid to the dualsampa object
              processStrategy: entity =>
                Object.assign(
                  {},
                  { ...entity, id: { deid, bending, dsid: entity.id } }
                )
            });
            const normalizedData = normalize(data, [dualsampa]);
            return {
              dualsampas: normalizedData.entities.dualsampas,
              dsids: normalizedData.result,
              id: {
                deid,
                bending
              }
            };
          }
        }
      }
    };
  }
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
    return selectors.has(state, deid, bending)
      ? selectors.deplane(state, deid, bending).isFetchingDualSampas
      : false;
  },
  isFetchingDe: (state, deid, bending) => {
    return selectors.has(state, deid, bending)
      ? selectors.deplane(state, deid, bending).isFetchingDe
      : false;
  },
  has: (state, deid, bending) =>
    selectors.deplane(state, deid, bending) !== undefined ? true : false
};
