import A from "./actionTypes";

// see FSA (Flux Standard Action) at
// https://github.com/redux-utilities/flux-standard-action
// for advices on how to structure actions

export const showRightPanel = () => ({
  type: A.CHANGE_RIGHT_PANEL_VISIBILITY,
  payload: true
});

export const showOutline = (partName, value) => ({
  type: A.SHOW_OUTLINE,
  payload: {
    partName: partName,
    value: value
  }
});
