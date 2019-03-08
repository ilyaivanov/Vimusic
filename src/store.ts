import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import player from "./player/reducer";
import treeReducer from "./tree/reducer";
import userSettings from "./userSettings/reducer";
import thunk from "redux-thunk";
import { SelectionScope, State } from "./types";
import treeMiddleware from "./tree/treeMiddleware";

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: typeof compose;
  }
}

function createNamedWrapperReducer(reducerFunction: any, selection: SelectionScope) {
  return (state: State, action: any) => {
    const isInitializationCall = state === undefined;
    const isCallWithinScope = action.selection === selection;
    if (!isCallWithinScope && !isInitializationCall) return state;
    return reducerFunction(state, action);
  };
}

const reducer = combineReducers({
  player,
  userSettings,
  favorites: createNamedWrapperReducer(treeReducer, "favorites"),
  search: createNamedWrapperReducer(treeReducer, "search")
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const createPlayerStore = () => createStore(reducer, composeEnhancers(applyMiddleware(thunk, treeMiddleware)));

export default createPlayerStore();


