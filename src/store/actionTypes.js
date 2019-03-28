const ActionTypes = {
  CHANGE_RIGHT_PANEL_VISIBILITY: "CHANGE_RIGHT_PANEL_VISIBILITY",
  TOGGLE_OUTLINE: "TOGGLE_OUTLINE",
  VIEW_DE: "VIEW_DE",
  ADD_DATA_SOURCE: "ADD_DATA_SOURCE",
  REMOVE_DATA_SOURCE: "REMOVE_DATA_SOURCE",
  CHANGE_DATA_SOURCE: "CHANGE_DATA_SOURCE"
};
export default ActionTypes;

// TODO
// should there be CHANGE_DATA_SOURCE_CONTENT ?
// or should data.content use a selector (i.e. derive the value
// from the rest of the state) ?
