// constants
const LayerCategories = [
  {
    key: "chamber",
    name: "Chamber"
  },
  {
    key: "de",
    name: "Detection Element"
  },
  {
    key: "ds",
    name: "Dual Sampa"
  },
  {
    key: "pad",
    name: "Pad"
  },
  {
    key: "cluster",
    name: "Cluster"
  },
  {
    key: "area",
    name: "Area"
  }
];

Object.freeze(LayerCategories);

export { LayerCategories };

// action types
export const types = {
  ALL: "OUTLINE/ALL",
  NONE: "OUTLINE/NONE",
  TOGGLE: "OUTLINE/TOGGLE"
};

// initial state
export const initialState = {
  pad: false,
  ds: true,
  de: false,
  chamber: false,
  cluster: false,
  area: false
};

// reducer
export default (state = initialState, action) => {
  if (state === undefined) {
    /// create default state
    let ns = {};
    LayerCategories.map(x => (ns[x.key] = x.key === "ds" ? true : false));
    return ns;
  }
  if (action.type === types.TOGGLE) {
    if (LayerCategories.some(x => action.payload.partName === x.key)) {
      return Object.assign({}, state, {
        [action.payload.partName]: !state[action.payload.partName]
      });
    }
  }
  if (action.type === types.ALL) {
    let ns = {};
    LayerCategories.map(x => (ns[x.key] = true));
    return ns;
  }
  if (action.type === types.NONE) {
    let ns = {};
    LayerCategories.map(x => (ns[x.key] = false));
    return ns;
  }
  return state;
};

// action creators
export const actions = {
  toggleOutline: partName => {
    if (LayerCategories.some(x => x.key === partName)) {
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
export const getAllSelected = state =>
  LayerCategories.every(x => state[x.key] === true);

export const getNoneSelected = state =>
  LayerCategories.every(x => state[x.key] === false);
