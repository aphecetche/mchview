import React from "react";
import { render } from "react-dom";
import configureStore from "./configureStore";
import Root from "./components/layout/Root";
import { enableAllPlugins } from "immer";

enableAllPlugins();

const store = configureStore();

render(<Root store={store} />, document.querySelector("mchviewapp"));
