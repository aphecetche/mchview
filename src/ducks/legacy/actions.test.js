import * as actions from "./actions.js";
import A from "./actionTypes.js";
import expect from "expect";
import { LayerCategories } from "../constants";

describe("actions", () => {
  LayerCategories.map(x => {
    it("should create an action to toggle outline of " + x.name, () => {
      const partName = x.key;
      const expected = {
        type: A.TOGGLE_OUTLINE,
        payload: {
          partName: x.key
        }
      };
      expect(actions.toggleOutline(partName)).toEqual(expected);
    });
  });
});
