import outline, {
  actions,
  types,
  LayerCategories,
  initialState
} from "./outline.js";
import expect from "expect";

describe("actions", () => {
  LayerCategories.map(x => {
    it("should create an action to toggle outline of " + x.name, () => {
      const partName = x.key;
      const expected = {
        type: types.TOGGLE,
        payload: {
          partName: x.key
        }
      };
      expect(actions.toggleOutline(partName)).toEqual(expected);
    });
  });
});
describe("outline reducer", () => {
  const ini = outline(undefined, {});

  it("should return the initial state", () => {
    expect(ini).toEqual(initialState);
  });

  it("should handle TOGGLE_OUTLINE", () => {
    const expected = Object.assign({}, ini);
    expected["de"] = true;
    expect(
      outline(ini, {
        type: types.TOGGLE,
        payload: { partName: "de" }
      })
    ).toEqual(expected);
  });

  it("should handle SHOW_OUTLINE_FOR_ALL", () => {
    var expected = {};
    LayerCategories.map(x => (expected[x.key] = true));
    expect(
      outline(ini, {
        type: types.ALL
      })
    ).toEqual(expected);
  });

  it("should handle SHOW_OUTLINE_FOR_NONE", () => {
    var expected = {};
    LayerCategories.map(x => (expected[x.key] = false));
    expect(
      outline(ini, {
        type: types.NONE
      })
    ).toEqual(expected);
  });
});
