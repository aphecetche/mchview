import outlineReducer from "./ducks/outline";
import viewReducer, { selectors as viewSelectors } from "./ducks/view";
import dataReducer, { selectors as dataSelectors } from "./ducks/data";
import { combineReducers } from "redux";
import visibilityReducer, {
  selectors as visibilitySelectors
} from "./ducks/visibility";
import areaReducer from "./ducks/area";

export default combineReducers({
  outline: outlineReducer,
  view: viewReducer,
  visibility: visibilityReducer,
  area: areaReducer,
  data: dataReducer,
  datasources: (state = {}, action) => state
});

// selectors
// here state is the top level app state, and
// we are using lower-level selectors which deals with partial state

export const selectors = {
  isModalVisible: state => visibilitySelectors.isModalVisible(state.visibility),
  isRightPanelVisible: state =>
    visibilitySelectors.isRightPanelVisible(state.visibility),
  deid: state => viewSelectors.deid(state.view),
  bending: state => viewSelectors.bending(state.view),
  area: state => state.area,
  dsValue: (state, dsid) => dataSelectors.dsValue(state.data, dsid)
};
