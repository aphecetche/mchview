import * as actions from "./actions.js";
import A from "./actionTypes.js";
import expect from "expect";
import { PartNames } from "../constants";
describe("actions", () => {
  Object.keys(PartNames).map(x => {
    it("should create an action to toggle outline of " + x, () => {
      const partName = x;
      const expected = {
        type: A.TOGGLE_OUTLINE,
        payload: {
          partName: partName
        }
      };
      expect(actions.toggleOutline(partName)).toEqual(expected);
    });
  });
});
