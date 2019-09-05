// action types
export const types = {
  FETCH_DUALSAMPAS_REQUEST: "ENVELOPS/FETCH_DUALSAMPAS_REQUEST",
  FETCH_DUALSAMPAS_FAILURE: "ENVELOPS/FETCH_DUALSAMPAS_FAILURE",
  FETCH_DUALSAMPAS_SUCCESS: "ENVELOPS/FETCH_DUALSAMPAS_SUCCESS"
};

{
  /* { type: 'FETCH_DUALSAMPAS_REQUEST' } */
}
{
  /* { type: 'FETCH_DUALSAMPAS_FAILURE', error: 'Oops' } */
}
{
  /* { type: 'FETCH_DUALSAMPAS_SUCCESS', response: { ... } } */
}

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

// reducer
export default (state = initialState, action) => {
  if (state === undefined) {
    return initialState;
  }
  if (action.type === types.FETCH_DUALSAMPAS_REQUEST) {
    return state;
  }
  if (action.type === types.FETCH_DUALSAMPAS_FAILURE) {
    return state;
  }
  if (action.type === types.FETCH_DUALSAMPAS_SUCCESS) {
    return state;
  }
  return state;
};

// action creators
export const actions = {
  requestDualSampas: (deid, bending) => ({
    type: types.FETCH_DUALSAMPAS_REQUEST,
    payload: {
      deid: deid,
      bending: bending
    }
  }),
  receiveDualSampas: json => ({
    type: types.FETCH_DUALSAMPAS_SUCCESS,
    payload: {
      json: json
    }
  })
};

const bendingPlaneName = bending => (bending ? "bending" : "non-bending");

// selectors
export const selectors = {
  plane: (state, deid, bending) => {
    if (state.des[deid]) {
      return state.des[deid][bendingPlaneName(bending)];
    }
    return false;
  },
  isFetching: (state, deid, bending) => {
    return selectors.has(state, deid, bending)
      ? selectors.plane(state, deid, bending).isFetching
      : false;
  },
  has: (state, deid, bending) =>
    selectors.plane(state, deid, bending) ? true : false
};
