import A from "./actionTypes";
import { combineReducers } from "redux";
import initialState from "../initialState.json";
import { PartNames } from "../constants";

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
    if (
      action.payload.partName == PartNames.Chamber ||
      action.payload.partName == PartNames.DetectionElement ||
      action.payload.partName == PartNames.DualSampa ||
      action.payload.partName == PartNames.Pad
    ) {
      let ns = state;
      ns[action.payload.partName] = !ns[action.payload.partName];
      return ns;
    }
  }
  return state;
};

export default combineReducers({
  visibility: combineReducers({ rightPanel, modal }),
  outline: outline
});
