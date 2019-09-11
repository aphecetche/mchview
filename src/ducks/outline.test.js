import outline, {
  actions,
  types,
  LayerCategories,
  initialState,
  selectors
} from "./outline.js";
import expect from "expect";
import { cloneDeep } from "lodash";

describe("actions", () => {
  Object.keys(LayerCategories).map(x => {
    it("should create an action to toggle outline of " + x.name, () => {
      const partName = x;
      const expected = {
        type: types.TOGGLE,
        payload: {
          partName: x
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
    const expected = cloneDeep(ini);
    expected["de"].show = true;
    const r = outline(ini, actions.toggleOutline("de"));
    expect(r).toEqual(expected);
  });

  it("should handle SHOW_OUTLINE_FOR_ALL", () => {
    const ns = outline(ini, actions.showOutlineForAll());
    expect(selectors.getAllSelected(ns)).toBe(true);
  });

  it("should handle SHOW_OUTLINE_FOR_NONE", () => {
    const ns = outline(ini, actions.showOutlineForNone());
    expect(selectors.getNoneSelected(ns)).toBe(true);
  });
});

describe("selectors", () => {
  const ini = outline(undefined, {});
  it("should return empty style for non existing layer category", () => {
    const t = selectors.style(ini, "toto");
    expect(t).toEqual({});
  });
  it("should return style for given key, e.g. de", () => {
    const t = selectors.style(
      {
        de: {
          show: true,
          stroke: "#123456",
          strokeWidth: 0.42
        },
        ds: {
          show: false
        }
      },
      "de"
    );
    expect(t).toEqual({ show: true, stroke: "#123456", strokeWidth: 0.42 });
  });
});
