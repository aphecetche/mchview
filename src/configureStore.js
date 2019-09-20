import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import reducer from "./reducers";
import reduxThunk from "redux-thunk";
import startup from "./startup";
import fetchMiddleware from "./services/fetchMiddleware";

const middleware = [reduxThunk, fetchMiddleware];

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
