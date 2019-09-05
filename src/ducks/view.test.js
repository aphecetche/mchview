import viewReducer, { actions, types, selectors } from "./view.js";
import expect from "expect";
import initialState from "../initialState.json";

describe("view reducer", () => {
  const ini = viewReducer(undefined, {});

  it("should return the initial state", () => {
    expect(ini).toEqual(initialState.view);
  });
});

describe("view selector", () => {
  const ini = { deid: 501, bending: false };
  it("deid should be 501", () => {
    expect(selectors.deid(ini)).toEqual(501);
  });
  it("bending should be false", () => {
    expect(selectors.bending(ini)).toEqual(false);
  });
});
