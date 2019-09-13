import { cloneDeep } from "lodash";
import { Categories } from "../categories";

// action types
export const types = {
  ALL: "OUTLINE/ALL",
  NONE: "OUTLINE/NONE",
  TOGGLE: "OUTLINE/TOGGLE"
};

// initial state
export const initialState = {
  de: { show: false, stroke: "#333333", strokeWidth: 0.7, disabled: true },
  deplane: { show: true, stroke: "#333333", strokeWidth: 0.7 },
  chamber: { show: false, stroke: "black", strokeWidth: 0.5, disabled: true },
  ds: { show: false, stroke: "black", strokeWidth: 0.3 },
  pad: { show: false, stroke: "black", strokeWidth: 0.1 },
  cluster: { show: false, stroke: "black", strokeWidth: 0.1 },
  area: { show: false, stroke: "blue", strokeWidth: 0.1 }
};

// reducer
export default (state = initialState, action) => {
  if (state === undefined) {
    return initialState;
  }
  if (action.type === types.TOGGLE) {
    const partName = action.payload.partName;
    if (partName in Categories) {
      let ns = cloneDeep(state);
      ns[partName].show = !ns[partName].show;
      return ns;
    }
    return state;
  }
  if (action.type === types.ALL) {
    let ns = cloneDeep(state);
    Object.keys(Categories).map(x => {
      ns[x].show = true;
    });
    return ns;
  }
  if (action.type === types.NONE) {
    let ns = cloneDeep(state);
    Object.keys(Categories).map(x => {
      ns[x].show = false;
    });
    return ns;
  }
  return state;
};

// action creators
export const actions = {
  toggleOutline: partName => {
    if (partName in Categories) {
      return {
        type: types.TOGGLE,
        payload: {
          partName: partName
        }
      };
    }
    alert("incorrect partName", partName);
    return {};
  },

  showOutlineForAll: () => ({
    type: types.ALL
  }),

  showOutlineForNone: () => ({
    type: types.NONE
  })
};

// selectors
export const selectors = {
  isVisible: (state, partName) => {
    if (partName in Categories) {
      return state[partName].show;
    }
    return false;
  },
  style: (state, partName) => {
    if (partName in Categories) {
      return state[partName];
    }
    return {};
  },
  getAllSelected: state =>
    Object.keys(Categories).every(x => state[x].show === true),
  getNoneSelected: state =>
    Object.keys(Categories).every(x => state[x].show === false)
};

export { Categories };
