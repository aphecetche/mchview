import { combineReducers } from "redux";
import outlineReducer, { selectors as outlineSelectors } from "./ducks/outline";
import viewReducer, { selectors as viewSelectors } from "./ducks/view";
import dataReducer, { selectors as dataSelectors } from "./ducks/data";
import envelopReducer, { selectors as envelopSelectors } from "./ducks/envelop";

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
  envelop: envelopReducer,
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
  currentElement: state => viewSelectors.currentElement(state.view),
  area: state => state.area,
  dsValue: (state, dsid) => dataSelectors.dsValue(state.data, dsid),
  isVisible: state => partName =>
    outlineSelectors.isVisible(state.outline, partName),
  outlineStyle: state => partName =>
    outlineSelectors.style(state.outline, partName),
  isFetchingDualSampas: state =>
    envelopSelectors.isFetchingDualSampas(
      state.envelop,
      selectors.deid(state),
      selectors.bending(state)
    ),
  isFetchingDEPlane: state =>
    envelopSelectors.isFetchingDE(
      state.envelop,
      selectors.deid(state),
      selectors.bending(state)
    ),
  isFetchingDE: state =>
    envelopSelectors.isFetchingDE(state.envelop, selectors.deid(state), true) ||
    envelopSelectors.isFetchingDE(state.envelop, selectors.deid(state), false),
  degeo: state =>
    envelopSelectors.deplane(
      state.envelop,
      selectors.deid(state),
      selectors.bending(state)
    ),
  deplane: (state, deid, bending) =>
    envelopSelectors.deplane(state.envelop, deid, bending)
};
