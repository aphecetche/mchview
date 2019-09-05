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
  isFetching: false,
  DE501: {
    NonBending: {
      DualSampas: [
        {
          ID: 1025,
          Vertices: [
            { X: 51.42856979, Y: 0 },
            { X: 51.42856979, Y: -20 },
            { X: 55.714284074, Y: -20 },
            { X: 55.714284074, Y: -17.5 },
            { X: 57.857141215999995, Y: -17.5 },
            { X: 57.857141215999995, Y: -12.5 },
            { X: 57.142855501999996, Y: -12.5 },
            { X: 57.142855501999996, Y: 0 },
            { X: 51.42856979, Y: 0 }
          ]
        },
        {
          ID: 1026,
          Vertices: [
            { X: 45.7142868, Y: 0 },
            { X: 45.7142868, Y: -20 },
            { X: 51.428572512, Y: -20 },
            { X: 51.428572512, Y: 0 },
            { X: 45.7142868, Y: 0 }
          ]
        }
      ]
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

// // selectors
// export const selectors = {
//   deid: state => state.deid,
//   bending: state => state.bending
// };
