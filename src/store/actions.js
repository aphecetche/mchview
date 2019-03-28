import A from "./actionTypes";
import { PartNames } from "../constants";
// see FSA (Flux Standard Action) at
// https://github.com/redux-utilities/flux-standard-action
// for advices on how to structure actions

export const showRightPanel = () => ({
  type: A.CHANGE_RIGHT_PANEL_VISIBILITY,
  payload: true
});

export const toggleOutline = partName => {
  if (PartNames.hasOwnProperty(partName)) {
    return {
      type: A.TOGGLE_OUTLINE,
      payload: {
        partName: partName
      }
    };
  }
  alert("incorrect partName", partName);
  return {};
};
