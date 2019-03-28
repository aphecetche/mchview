import * as actions from "./actions.js";
import A from "./actionTypes.js";
import expect from "expect";
import { PartNames } from "../constants";
describe("actions", () => {
  Object.keys(PartNames).map(x => {
    const values = { show: true, hide: false };
    Object.keys(values).map(v => {
      it("should create an action to " + v + " outline of " + x, () => {
        const partName = x;
        const expected = {
          type: A.SHOW_OUTLINE,
          payload: {
            partName: partName,
            value: values[v]
          }
        };
        expect(actions.showOutline(partName, values[v])).toEqual(expected);
      });
    });
  });
});
