import A from "./actionTypes";
import { combineReducers } from "redux";
import initialState from "../initialState.json";
import { LayerCategories } from "../constants";

export const rightPanel = (state = false, action) => {
  return action.type === A.CHANGE_RIGHT_PANEL_VISIBILITY
    ? action.payload
    : state;
};

export const modal = (state = false, action) => {
  return action.type === A.CHANGE_MODAL_VISIBILITY ? action.payload : state;
};

export const outline = (state = initialState.outline, action) => {
  if (action.type === A.TOGGLE_OUTLINE) {
    if (LayerCategories.some(x => action.payload.partName === x.key)) {
      return Object.assign({}, state, {
        [action.payload.partName]: !state[action.payload.partName]
      });
    }
  }
  return state;
};

export default combineReducers({
  visibility: combineReducers({ rightPanel, modal }),
  outline: outline
});
