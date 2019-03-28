import A from "./actionTypes";
import { combineReducers } from "redux";
import initialState from "../initialState.json";

export const rightPanel = (state = false, action) => {
  return action.type === A.CHANGE_RIGHT_PANEL_VISIBILITY
    ? action.payload
    : state;
};

export const modal = (state = false, action) => {
  return action.type === A.CHANGE_MODAL_VISIBILITY ? action.payload : state;
};

export const outline = (state = initialState, action) => {
  return action.type === A.SHOW_OUTLINE ? action.payload : state;
};

export default combineReducers({
  visibility: combineReducers({ rightPanel, modal }),
  outline: outline
});
