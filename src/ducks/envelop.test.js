// import envelopReducer, { actions, types } from "./envelop";
import envelopReducer, { selectors as envelopSelectors } from "./envelop";
import expect from "expect";
import { initialState } from "./envelop";

describe("ctor", () => {
  const ini = envelopReducer(undefined, {});
  it("should return the initial state", () => {
    expect(ini).toEqual(initialState);
  });
});

describe("isFetching selector ", () => {
  const ini = envelopReducer(undefined, {});
  it("should return false for 819 bending", () => {
    expect(envelopSelectors.isFetching(ini, 819, true)).toEqual(false);
  });
  it("should return true for 706 bending", () => {
    expect(envelopSelectors.isFetching(ini, 706, true)).toEqual(true);
  });
  it("should return true for 706 non-bending", () => {
    expect(envelopSelectors.isFetching(ini, 706, false)).toEqual(false);
  });
});

describe("has selector ", () => {
  const ini = envelopReducer(undefined, {});
  it("should not have 819 bending", () => {
    expect(envelopSelectors.has(ini, 819, true)).toEqual(false);
  });
  it("should have 819 non-bending", () => {
    expect(envelopSelectors.has(ini, 819, false)).toEqual(true);
  });
  it("should have 706 bending", () => {
    expect(envelopSelectors.has(ini, 706, true)).toEqual(true);
  });
});
