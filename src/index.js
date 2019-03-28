import ReactDOM from "react-dom";
import React from "react";
import App from "./components/layout/App";
import { Provider } from "react-redux";
import initialState from "./initialState.json";
import { createStore } from "redux";
import appReducer from "./store/reducers";

const store = createStore(
  appReducer,
  initialState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector("mchviewapp")
);
