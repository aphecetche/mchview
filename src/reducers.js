import outlineReducer from "./ducks/outline.js";
import { combineReducers } from "redux";

export default combineReducers({
  outline: outlineReducer,
  visibility: (state = {}, action) => state,
  view: (state = {}, action) => state,
  data: (state = {}, action) => state,
  datasources: (state = {}, action) => state
});

// export const rightPanel = (state = false, action) => {
//   return action.type === A.CHANGE_RIGHT_PANEL_VISIBILITY
//     ? action.payload
//     : state;
// };
//
// export const modal = (state = false, action) => {
//   return action.type === A.CHANGE_MODAL_VISIBILITY ? action.payload : state;
// };
//
