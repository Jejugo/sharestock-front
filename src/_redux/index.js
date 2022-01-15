import { createStore, applyMiddleware, compose } from "redux";
import { createWrapper } from "next-redux-wrapper"
import thunk from "redux-thunk";

import reducers from "./reducers";

const reduxDevtools =
  typeof window !== "undefined" && process.env.NODE_ENV !== "production"
    ? window.__REDUX_DEVTOOLS_EXTENSION__ &&
      window.__REDUX_DEVTOOLS_EXTENSION__()
    : f => f;

const enhancers = compose(
  applyMiddleware(thunk),
  reduxDevtools
);

// create a makeStore function
const makeStore = (context) => createStore(reducers, context, enhancers);

export const wrapper = createWrapper(makeStore, {debug: true});
