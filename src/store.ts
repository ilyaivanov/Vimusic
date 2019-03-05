import { combineReducers, createStore } from "redux";
import player from "./player/reducer";

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION__: any;
  }
}

const reducer = combineReducers({
  player
});

export const createPlayerStore = () => createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default createPlayerStore();


