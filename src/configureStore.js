import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import reducer from "./reducers";
import reduxThunk from "redux-thunk";
import startup from "./startup";
import axiosMiddleWare from "redux-axios-middleware";
import axios from "axios";

const mappingAPI = axios.create({
  baseURL: "http://localhost:8080/v2",
  responseType: "json"
});

const middleware = [reduxThunk, axiosMiddleWare(mappingAPI)];

const configureStore = () => {
  const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(...middleware))
  );
  startup().map(x => {
    store.dispatch(x);
  });
  return store;
};

export default configureStore;
