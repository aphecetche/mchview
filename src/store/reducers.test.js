import { outline } from "./reducers.js";
import expect from "expect";
import A from "./actionTypes.js";
import initialState from "../initialState.json";

describe("outline reducer", () => {
  it("should return the initial state", () => {
    expect(outline(undefined, {})).toEqual(initialState);
  });

  it("should handle SHOW_OUTLINE", () => {
    expect(
      outline(
        { partName: "de", value: false },
        {
          type: A.SHOW_OUTLINE,
          payload: { partName: "de", value: true }
        }
      )
    ).toEqual({ partName: "de", value: true });
  });
});
