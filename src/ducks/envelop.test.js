import reducer, {
  selectors,
  initialState,
  assertDePlaneState
} from "./envelop";
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
          isLoading: true,
          dualsampas: {
            isLoading: false
          }
        }
      }
    }
  };
  const expected2 = {
    des: {
      100: {
        id: { deid: 100 },
        "non-bending": {
          isLoading: true,
          dualsampas: {
            isLoading: false
          }
        }
      },
      300: {
        id: { deid: 300 },
        bending: {
          isLoading: true,
          dualsampas: {
            isLoading: false
          }
        }
      }
    }
  };
  let state1 = reducer(
    {},
    {
      type: "FETCH_DUALSAMPAS",
      payload: {
        id: {
          deid: 300,
          bending: true
        }
      }
    }
  );
  it("should add DE 300,bending to empty state", () => {
    expect(state1).toEqual(expected1);
  });
  let state2 = reducer(state1, {
    type: "FETCH_DUALSAMPAS",
    payload: {
      id: {
        deid: 100,
        bending: false
      }
    }
  });
  it("should add DE 100,non-bending to previous state", () => {
    expect(state2).toEqual(expected2);
  });
});

describe("assert DePlaneState", () => {
  const expected = {
    des: {
      100: {
        id: { deid: 100 },
        bending: {
          isLoading: false,
          dualsampas: {
            isLoading: false
          }
        }
      }
    }
  };
  it("should return single des key starting from empty state", () => {
    const got = assertDePlaneState({}, { deid: 100, bending: true });
    expect(got).toEqual(expected);
  });
});

describe("envelop selector", () => {
  const expected = "unrealistic";
  const state = {
    des: {
      819: {
        id: { deid: 819 },
        "non-bending": {
          isLoading: expected
        }
      }
    }
  };
  it("should return expected value", () => {
    expect(selectors.isLoading(state, { deid: 819, bending: false })).toBe(
      expected
    );
  });
  it("should return same as before", () => {
    const e = selectors.envelop(state, { deid: 819, bending: false });
    expect(e.isLoading).toBe(expected);
  });
});
