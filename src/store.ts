import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import player from "./player/reducer";
import treeReducer from "./tree/reducer";
import userSettings from "./userSettings/reducer";
import thunk from "redux-thunk";

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: typeof compose;
  }
}

const reducer = combineReducers({
  player,
  userSettings,
  favorites: treeReducer,
  search: treeReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const createPlayerStore = () => createStore(reducer, composeEnhancers(applyMiddleware(thunk)));

export default createPlayerStore();


