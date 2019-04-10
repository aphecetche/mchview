import viewReducer, { actions, types, selectors } from "./view.js";
import expect from "expect";
import initialState from "../initialState.json";

describe("actions", () => {
  it("should create an action to set detection element to 1025, nonbending", () => {
    const expected = {
      type: types.SET_DETECTION_ELEMENT,
      payload: {
        deid: 1025,
        bending: false
      }
    };
    expect(actions.setDetectionElement(1025, false)).toEqual(expected);
  });
});

describe("view reducer", () => {
  const ini = viewReducer(undefined, {});

  it("should return the initial state", () => {
    expect(ini).toEqual(initialState.view);
  });
});

describe("view selector", () => {
  const ini = { view: { deid: 501, bending: false } };
  it("deid should be 501", () => {
    expect(selectors.deid(ini)).toEqual(501);
  });
  it("bending should be false", () => {
    expect(selectors.bending(ini)).toEqual(false);
  });
});
