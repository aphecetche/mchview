import { outline } from "./reducers.js";
import expect from "expect";
import A from "./actionTypes.js";
import initialState from "../initialState.json";
import { PartNames } from "../constants.js";

describe("outline reducer", () => {
  it("should return the initial state", () => {
    expect(outline(undefined, {})).toEqual(initialState.outline);
  });

  it("should handle SHOW_OUTLINE", () => {
    const ini = {
      [PartNames.Chamber]: false,
      [PartNames.DetectionElement]: false,
      [PartNames.DualSampa]: false,
      [PartNames.Pad]: false
    };
    expect(
      outline(ini, {
        type: A.SHOW_OUTLINE,
        payload: { partName: PartNames.DetectionElement, value: true }
      })
    ).toEqual({
      [PartNames.Chamber]: false,
      [PartNames.DetectionElement]: true,
      [PartNames.DualSampa]: false,
      [PartNames.Pad]: false
    });
  });
});
