import { combineReducers } from "redux";
import outlineReducer, { selectors as outlineSelectors } from "./ducks/outline";
import viewReducer, { selectors as viewSelectors } from "./ducks/view";
import dataReducer, { selectors as dataSelectors } from "./ducks/data";
import envelopReducer, { selectors as envelopSelectors } from "./ducks/envelop";
import * as categories from "./categories";
import { isEqual } from "lodash";

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
  isVisible: (state, category) =>
    outlineSelectors.isVisible(state.outline, category),
  outlineStyle: (state, category) =>
    outlineSelectors.style(state.outline, category),
  isFetchingDualSampas: state =>
    envelopSelectors.isFetchingDualSampas(
      state.envelop,
      selectors.deid(state),
      selectors.bending(state)
    ),
  isFetchingDePlane: (state, deid, bending) =>
    envelopSelectors.isFetchingDePlane(state.envelop, deid, bending),
  degeo: state =>
    envelopSelectors.deplane(
      state.envelop,
      selectors.deid(state),
      selectors.bending(state)
    ),
  hasDe: (state, deid) => envelopSelectors.hasDe(state.envelop, deid),
  hasDePlane: (state, deid, bending) =>
    envelopSelectors.hasDePlane(state.envelop, deid, bending),
  deplane: (state, deid, bending) =>
    envelopSelectors.deplane(state.envelop, deid, bending),
  isAvailable: (state, category) => {
    if (isEqual(categories.de, category)) {
      return envelopSelectors.hasDe(selectors.deid(state));
    }
    if (isEqual(categories.deplane, category)) {
      return envelopSelectors.hasDePlane(
        selectors.deid(state),
        selectors.bending(state)
      );
    }
    return false;
  }
};
