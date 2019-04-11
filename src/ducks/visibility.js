// action types
export const types = {
  SHOW_MODAL: "VISIBILITY/SHOW_MODAL",
  HIDE_MODAL: "VISIBILITY/HIDE_MODAL"
};

// initial state
export const initialState = {
  rightPanel: false,
  modal: false
};

// reducer
export default (state = initialState, action) => {
  if (state === undefined) {
    return initialState;
  }
  if (action.type === types.SHOW_MODAL) {
    return Object.assign({}, state, { modal: true });
  }
  if (action.type === types.HIDE_MODAL) {
    return Object.assign({}, state, { modal: false });
  }
  return state;
};

// action creators
export const actions = {
  showModal: () => ({ type: types.SHOW_MODAL }),
  hideModal: () => ({ type: types.HIDE_MODAL })
};

// selectors
export const selectors = {
  isModalVisible: state => state.modal === true
};
