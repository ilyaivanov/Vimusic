import { createStore } from "redux";
import reducer from "./reducer";
import { PlayerStore } from "./types";

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION__: any;
  }
}
export const createPlayerStore = (): PlayerStore => createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default createPlayerStore();
