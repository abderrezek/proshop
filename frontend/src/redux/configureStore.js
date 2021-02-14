import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

import rootReducer from "./reducers";
import { rootState } from "./reducers/initialeState";

const middleware = [thunk];

export default function store(initialeState = rootState) {
  return createStore(
    rootReducer,
    initialeState,
    composeWithDevTools(applyMiddleware(...middleware))
  );
}
