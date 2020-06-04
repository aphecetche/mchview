import viewReducer, { actions, selectors } from "./view.js";
import expect from "expect";
import initialState from "../initialState.json";

const ce = { id: { a: 1, b: 2 }, value: "c" };

describe("view reducer", () => {
  const ini = viewReducer(undefined, {});

  it("should return the initial state", () => {
    expect(ini).toEqual(initialState.view);
  });

  it("should return a state with modified currentElement", () => {
    const s = viewReducer(ini, actions.setCurrentElement({ a: 1, b: 2 }, "c"));
    expect(s.currentElement).toEqual(ce);
  });
});

describe("view selector", () => {
  const ini = { deid: 501, bending: false };
  it("currentElement should be {id:{a:1,b:2},c}", () => {
    const s = viewReducer(ini, actions.setCurrentElement({ a: 1, b: 2 }, "c"));
    expect(selectors.currentElement(s)).toEqual(ce);
  });
});
