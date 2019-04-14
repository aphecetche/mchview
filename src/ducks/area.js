// action types
export const types = {
  SET_XMIN: "AREA/SET_XMIN",
  SET_XMAX: "AREA/SET_XMAX",
  SET_YMIN: "AREA/SET_YMIN",
  SET_YMAX: "AREA/SET_YMAX"
};

// initial state
export const initialState = {
  xmin: "10",
  ymin: "10",
  xmax: "12",
  ymax: "15"
};

// reducer
export default (state = initialState, action) => {
  if (state === undefined) {
    return initialState;
  }
  if (action.type === types.SET_XMIN) {
    return Object.assign({}, state, { xmin: action.payload.value });
  }
  if (action.type === types.SET_YMIN) {
    return Object.assign({}, state, { ymin: action.payload.value });
  }
  if (action.type === types.SET_XMAX) {
    return Object.assign({}, state, { xmax: action.payload.value });
  }
  if (action.type === types.SET_YMAX) {
    return Object.assign({}, state, { ymax: action.payload.value });
  }
  return state;
};

// action creators
export const actions = {
  setXmin: value => {
    return {
      type: types.SET_XMIN,
      payload: {
        value: value
      }
    };
  },
  setYmin: value => {
    return {
      type: types.SET_YMIN,
      payload: {
        value: value
      }
    };
  },
  setXmax: value => {
    return {
      type: types.SET_XMAX,
      payload: {
        value: value
      }
    };
  },
  setYmax: value => {
    return {
      type: types.SET_YMAX,
      payload: {
        value: value
      }
    };
  }
};
