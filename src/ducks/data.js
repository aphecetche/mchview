import envelops from "../services/envelops.js";
import axios from "axios";

// action types
export const types = {
  SET: "DATA/SET",
  SET_DS_VALUE: "DATA/SET_DS_VALUE",
  RANDOM_DATA: "DATA/RANDOM_DATA"
};

// initial state
export const initialState = {
  source: 1,
  content: [
    {
      dsid: 1125,
      value: 11
    },
    {
      dsid: 1126,
      value: 12
    },
    {
      dsid: 1132,
      value: 11
    }
  ]
};

// action creators
export const actions = {
  setData: (source, content) => ({
    type: types.SET,
    payload: {
      source: source,
      content: content
    }
  }),
  setDsValue: (dsid, value) => ({
    type: types.SET_DS_VALUE,
    payload: {
      dsid: dsid,
      value: value
    }
  }),
  randomData: (deid, bending) => {
    return dispatch => {
      axios
        .get(
          "http://mchmapping.aphecetche.me:3333/dualsampas?deid=819&bending=false"
        )
        .then(response => {
          console.log(response.data);
          const data = response.data.DualSampas.map(x => {
            return { dsid: x.ID, value: Math.random() * 500.0 };
          });
          dispatch(actions.setData(-1, data));
        });
    };
    // TODO: handle the fetching of dual sampa list
    // return dispatch => {
    //     if listofdualsampas not uptodate for deid, bending
    //     fetchDualSampaList(deid,bending)
    //     if fetch successfull then dispatch({
    //       type: types.RANDOM_DATA,
    //       payload: {
    //         deid: deid,
    //         bending: bending
    //       })
    //     else dispatch(error)
    //     }
    //
    // };
  }
};

// reducer
export default (state = initialState, action) => {
  if (state === undefined) {
    return initialState;
  }
  if (action.type === types.RANDOM_DATA) {
    const dsrequest = envelops.request(
      action.payload.deid,
      action.payload.bending,
      "dualsampas"
    );
    let n = 0;
    dsrequest.then(result => {
      n = result.DualSampas.length;
      // result.DualSampas.map(x => {
      //   dispatch(setDsValue(x.ID, Math.random(500)));
      // });
      return {
        source: -1,
        content: {
          dsid: 42,
          value: n
        }
      };
    });
  }
  if (action.type === types.SET) {
    return Object.assign({}, state, {
      source: action.payload.source,
      content: action.payload.content
    });
  }
  if (action.type === types.SET_DS_VALUE) {
    const newContent = [...state.content];
    const dsid = action.payload.dsid;
    let newds = true;
    newContent.map(x => {
      if (x.dsid === dsid) {
        x.value = action.payload.value;
        newds = false;
      }
    });
    if (newds) {
      return Object.assign({}, state, {
        content: newContent.concat({
          dsid: action.payload.dsid,
          value: action.payload.value
        })
      });
    } else {
      return Object.assign({}, state, {
        content: newContent
      });
    }
  }
  return state;
};

// selectors
export const selectors = {
  source: state => state.source,
  content: state => state.content,
  dsValue: (state, dsid) => {
    let v = -1;
    state.content.map(x => {
      if (x.dsid == dsid) {
        v = x.value;
      }
    });
    return v;
  }
};
