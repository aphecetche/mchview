import reducer, { selectors, actions, initialState, assertDE } from "./envelop";
import expect from "expect";

describe("ctor", () => {
  const ini = reducer(undefined, {});
  it("should return the initial state", () => {
    expect(ini).toEqual(initialState);
  });
});

describe("assert DE", () => {
  const expected = {
    des: {
      100: {
        id: { deid: 100 },
        bending: {
          isFetchingDualSampas: false
        }
      }
    }
  };
  it("should return single des key starting from empty state", () => {
    expect(assertDE({}, 100, true)).toEqual(expected);
  });
});
