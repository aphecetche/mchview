// action types
export const types = {
  SET_DETECTION_ELEMENT: "VIEWSELECTOR/SET_DETECTION_ELEMENT"
};

// initial state
export const initialState = {
  deid: 501,
  bending: false
};

// reducer
export default (state = initialState, action) => {
  if (state === undefined) {
    return initialState;
  }
  if (action.type === types.SET_DETECTION_ELEMENT) {
    return Object.assign({}, state, {
      deid: parseInt(action.payload.deid, 10),
      bending: action.payload.bending
    });
  }
  return state;
};

// action creators
export const actions = {
  setDetectionElement: (deid, bending) => ({
    type: types.SET_DETECTION_ELEMENT,
    payload: {
      deid: deid,
      bending: bending
    }
  })
};

// selectors
export const selectors = {
  deid: state => state.deid,
  bending: state => state.bending
};
