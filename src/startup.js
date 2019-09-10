import { actions as outlineActions } from "./ducks/outline";
import { actions as viewActions } from "./ducks/view";

const startup = () => {
  return [
    viewActions.setDetectionElement(501, false),
    outlineActions.toggleOutline("de")
  ];
};

export default startup;
