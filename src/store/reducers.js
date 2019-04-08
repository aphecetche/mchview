import A from "./actionTypes";
import { combineReducers } from "redux";
import { LayerCategories } from "../constants";

export const rightPanel = (state = false, action) => {
  return action.type === A.CHANGE_RIGHT_PANEL_VISIBILITY
    ? action.payload
    : state;
};

export const modal = (state = false, action) => {
  return action.type === A.CHANGE_MODAL_VISIBILITY ? action.payload : state;
};

export const outline = (state, action) => {
  if (state === undefined) {
    /// create default state
    var ns = {};
    LayerCategories.map(x => (ns[x.key] = x.key === "ds" ? true : false));
    return ns;
  }
  if (action.type === A.TOGGLE_OUTLINE) {
    if (LayerCategories.some(x => action.payload.partName === x.key)) {
      return Object.assign({}, state, {
        [action.payload.partName]: !state[action.payload.partName]
      });
    }
  }
  if (action.type === A.SHOW_OUTLINE_FOR_ALL) {
    var newState = {};
    LayerCategories.map(x => (newState[x.key] = true));
    return newState;
  }
  return state;
};

export default combineReducers({
  visibility: combineReducers({ rightPanel, modal }),
  outline: outline
});
