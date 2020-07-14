import { createStore, applyMiddleware, compose } from "redux";
import reduxThunk from "redux-thunk";

import reducers from "./reducers";

const initialState = {};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducers,
  initialState,
  composeEnhancers(applyMiddleware(reduxThunk))
);

export default store;
