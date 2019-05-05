import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";

const initialState = {};

const middleware = [thunk];

var store ;

if (
  window.navigator.userAgent.includes("Chrome") &&
  !/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i.test(
    window.navigator.userAgent
  )
) {
   store = createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(...middleware)
      //,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
  );
} else {
   store = createStore(
    rootReducer,
    initialState,
    compose(applyMiddleware(...middleware))
  );
}
export default store;