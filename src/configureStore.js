import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import reducer from "./reducers";
import reduxThunk from "redux-thunk";

const middleware = [reduxThunk];

const configureStore = () => {
  const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(...middleware))
  );
  return store;
};

export default configureStore;
