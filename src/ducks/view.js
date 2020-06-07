import { actions as envelopActions } from "./envelop";
import { cloneDeep } from "lodash";
import * as categories from "../categories";

// action types
export const types = {
  SET_CURRENT_ELEMENT: "VIEW/SET_CURRENT_ELEMENT"
};

// initial state
export const initialState = {
  currentElement: null
};

// reducer
export default (state = initialState, action) => {
  if (state === undefined) {
    return initialState;
  }
  if (action.type === types.SET_CURRENT_ELEMENT) {
    let ns = cloneDeep(state);
    ns["currentElement"] = action.payload;
    return ns;
  }
  return state;
};

// action creators
export const actions = {
  setCurrentElement: element => {
    return {
      type: types.SET_CURRENT_ELEMENT,
      payload: {
        ...element
      }
    };
  }
};

// selectors
export const selectors = {
  currentElement: state => state.currentElement
};
