import reducer, { selectors, actions, initialState, assertDE } from "./envelop";
import expect from "expect";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import moxios from "moxios";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("ctor", () => {
  const ini = reducer(undefined, {});
  it("should return the initial state", () => {
    expect(ini).toEqual(initialState);
  });
});

describe("isFetching selector ", () => {
  const ini = reducer(undefined, {});
  it("should return false for 819 bending", () => {
    expect(selectors.isFetching(ini, 819, true)).toEqual(false);
  });
  it("should return true for 706 bending", () => {
    expect(selectors.isFetching(ini, 706, true)).toEqual(true);
  });
  it("should return true for 706 non-bending", () => {
    expect(selectors.isFetching(ini, 706, false)).toEqual(false);
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

describe("dispatch fetch dualsampa action", () => {
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });
  it("creates FETCH_DUALSAMPAS_REQUEST when fetching dualsampas", () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {}
      });
    });
    const expectedActions = [
      actions.requestDualSampas(819, false),
      actions.receiveDualSampas(819, false, {})
    ];
    const store = mockStore({});
    return store.dispatch(actions.fetchDualSampas(819, false)).then(() => {
      const actions = store.getActions();
      expect(actions).toEqual(expectedActions);
    });
  });
});

describe("assert DE", () => {
  const expected = {
    des: {
      100: {
        id: 100,
        bending: {
          isFetching: false
        }
      }
    }
  };
  it("should return single des key starting from empty state", () => {
    expect(assertDE({}, 100, true)).toEqual(expected);
  });
});
