import outlineReducer from "./ducks/outline.js";
import viewReducer, { selectors as viewSelectors } from "./ducks/view.js";
import { combineReducers } from "redux";
import visibilityReducer, {
  selectors as visibilitySelectors
} from "./ducks/visibility.js";
export default combineReducers({
  outline: outlineReducer,
  view: viewReducer,
  visibility: visibilityReducer,
  data: (state = {}, action) => state,
  datasources: (state = {}, action) => state
});

// selectors
// here state is the top level app state, and
// we are using lower-level selectors which deals with partial state

export const selectors = {
  isModalVisible: state => visibilitySelectors.isModalVisible(state.visibility),
  deid: state => viewSelectors.deid(state.view),
  bending: state => viewSelectors.bending(state.view)
};
