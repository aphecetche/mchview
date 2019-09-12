import viewReducer, { actions, selectors } from "./view.js";
import expect from "expect";
import initialState from "../initialState.json";

const ce = { type: "a", id: "b", value: "c" };

describe("view reducer", () => {
  const ini = viewReducer(undefined, {});

  it("should return the initial state", () => {
    expect(ini).toEqual(initialState.view);
  });

  it("should return a state with modified currentElement", () => {
    const s = viewReducer(ini, actions.setCurrentElement("a", "b", "c"));
    expect(s.currentElement).toEqual(ce);
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
  it("currentElement should be {a,b,c}", () => {
    const s = viewReducer(ini, actions.setCurrentElement("a", "b", "c"));
    expect(selectors.currentElement(s)).toEqual(ce);
  });
});
