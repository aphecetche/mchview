import A from "./actionTypes";
import { LayerCategories } from "../constants";
// see FSA (Flux Standard Action) at
// https://github.com/redux-utilities/flux-standard-action
// for advices on how to structure actions

export const showRightPanel = () => ({
  type: A.CHANGE_RIGHT_PANEL_VISIBILITY,
  payload: true
});

export const toggleOutline = partName => {
  if (LayerCategories.some(x => x.key === partName)) {
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

export const showOutlineForAll = () => ({
  type: A.SHOW_OUTLINE_FOR_ALL
});

export const showOutlineForNone = () => ({
  type: A.SHOW_OUTLINE_FOR_NONE
});
