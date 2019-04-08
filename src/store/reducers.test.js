import { outline } from "./reducers.js";
import expect from "expect";
import A from "./actionTypes.js";
import initialState from "../initialState.json";
import { LayerCategories } from "../constants";

describe("outline reducer", () => {
  const ini = outline(undefined, {});

  it("should return the initial state", () => {
    expect(ini).toEqual(initialState.outline);
  });

  it("should handle TOGGLE_OUTLINE", () => {
    const expected = Object.assign({}, ini);
    expected["de"] = true;
    expect(
      outline(ini, {
        type: A.TOGGLE_OUTLINE,
        payload: { partName: "de" }
      })
    ).toEqual(expected);
  });

  it("should handle SHOW_OUTLINE_ALL", () => {
    var expected = {};
    LayerCategories.map(x => (expected[x.key] = true));
    expect(
      outline(ini, {
        type: A.SHOW_OUTLINE_ALL
      })
    ).toEqual(expected);
  });
});
