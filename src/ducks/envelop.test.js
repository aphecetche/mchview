import reducer, { selectors, actions, initialState, assertDE } from "./envelop";
import expect from "expect";

describe("ctor", () => {
  const ini = reducer(undefined, {});
  it("should return the initial state", () => {
    expect(ini).toEqual(initialState);
  });
});

describe("isFetchingDualSampas selector ", () => {
  const ini = reducer(undefined, {});
  it("should return false for 819 bending", () => {
    expect(selectors.isFetchingDualSampas(ini, 819, true)).toEqual(false);
  });
  it("should return true for 706 bending", () => {
    expect(selectors.isFetchingDualSampas(ini, 706, true)).toEqual(true);
  });
  it("should return true for 706 non-bending", () => {
    expect(selectors.isFetchingDualSampas(ini, 706, false)).toEqual(false);
  });
});

describe("has selector ", () => {
  const ini = reducer(undefined, {});
  it("should not have 819 bending", () => {
    expect(selectors.has(ini, 819, true)).toEqual(false);
  });
  it("should have 819 non-bending", () => {
    expect(selectors.has(ini, 819, false)).toEqual(true);
  });
  it("should have 706 bending", () => {
    expect(selectors.has(ini, 706, true)).toEqual(true);
  });
});

describe("envelop reducer", () => {
  const expected1 = {
    des: {
      300: {
        id: 300,
        bending: {
          isFetchingDualSampas: true
        }
      }
    }
  };
  const expected2 = {
    des: {
      100: {
        id: 100,
        "non-bending": {
          isFetchingDualSampas: true
        }
      },
      300: {
        id: 300,
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
        id: 100,
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
