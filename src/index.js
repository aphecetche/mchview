import m from "mithril";
import App from "./components/layout/App";
import initialState from "./initialState.json";
import { createStore } from "redux";
import appReducer from "./store/reducers";

const store = createStore(appReducer, initialState);

window.store = store;

console.log(initialState);

m.mount(document.body, App);
