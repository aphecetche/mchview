import { actions as envelopActions } from "./envelop";

// action types
export const types = {
  SET_DETECTION_ELEMENT: "VIEW/SET_DETECTION_ELEMENT"
};

// initial state
export const initialState = {
  deid: 501,
  bending: false,
  currentElement: "42"
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
  setDetectionElement: (deid, bending) => {
    return dispatch => {
      let p1 = dispatch(envelopActions.fetchDualSampas(deid, bending));
      let p2 = dispatch(envelopActions.fetchDE(deid, bending));
      Promise.all([p1, p2]).then(() => {
        dispatch({
          type: types.SET_DETECTION_ELEMENT,
          payload: {
            deid: deid,
            bending: bending
          }
        });
      });
    };
  }
};

// selectors
export const selectors = {
  deid: state => state.deid,
  bending: state => state.bending,
  currentElement: state => state.currentElement
};
