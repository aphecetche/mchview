import reducer, { selectors, actions, initialState, assertDE } from "./envelop";
import expect from "expect";

describe("ctor", () => {
  const ini = reducer(undefined, {});
  it("should return the initial state", () => {
    expect(ini).toEqual(initialState);
  });
});

describe("envelop reducer", () => {
  const expected1 = {
    des: {
      300: {
        id: { deid: 300 },
        bending: {
          isFetchingDualSampas: true
        }
      }
    }
  };
  const expected2 = {
    des: {
      100: {
        id: { deid: 100 },
        "non-bending": {
          isFetchingDualSampas: true
        }
      },
      300: {
        id: { deid: 300 },
        bending: {
          isFetchingDualSampas: true
        }
      }
    }
  };
  let state1 = reducer({}, actions.requestDualSampas(300, true));
  it("should add DE 300,bending to empty state", () => {
    expect(state1).toEqual(expected1);
  });
  let state2 = reducer(state1, actions.requestDualSampas(100, false));
  it("should add DE 100,non-bending to previous state", () => {
    expect(state2).toEqual(expected2);
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
