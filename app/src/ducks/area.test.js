import areaReducer, { actions, types } from "./area";
import expect from "expect";
import { initialState } from "./area";

describe("actions", () => {
  it("should create an action to set area's xmin to 42", () => {
    const expected = {
      type: types.SET_XMIN,
      payload: {
        value: 42
      }
    };
    expect(actions.setXmin(42)).toEqual(expected);
  });
});

describe("area reducer", () => {
  const ini = areaReducer(undefined, {});
  it("should return the initial state", () => {
    expect(ini).toEqual(initialState);
  });
});
