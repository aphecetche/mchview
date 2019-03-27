import m from "mithril";
import App from "./components/layout/App";

// import initialState from "./initialState.json";
// import { createStore } from "redux";
// import appReducer from "./store/reducers";
// const store = createStore(appReducer, initialState);
// window.store = store;
// console.log(initialState);

const Container = {
  oninit: vnode => {
    vnode.state = { state: vnode.state, a: 1 };
  },
  view: ({ children }) => {
    return m("container", children);
  }
};

const Play = {
  view: ({ attrs }) => {
    return m("play", m("p", attrs.montexte));
  }
};

var premier = m(Play, { montexte: "premier" });
var second = m(Play, { montexte: "second" });
var cont = m(Container, premier, second);

console.log("premier=", premier);
console.log("second=", second);
console.log("cont=", cont);

window.cont = cont;
window.premier = premier;
window.second = second;
m.render(document.body, cont);
//m.mount(document.body, App);
