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
    let ns = {};
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
    let ns = {};
    LayerCategories.map(x => (ns[x.key] = true));
    return ns;
  }
  if (action.type === A.SHOW_OUTLINE_FOR_NONE) {
    let ns = {};
    LayerCategories.map(x => (ns[x.key] = false));
    return ns;
  }
  return state;
};

export default combineReducers({
  visibility: combineReducers({ rightPanel, modal }),
  outline: outline,
  view: (state = {}, action) => state,
  data: (state = {}, action) => state,
  datasources: (state = {}, action) => state
});
