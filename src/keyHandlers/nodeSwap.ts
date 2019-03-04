import {AppState, Dispatch} from "../types";
import {getParentKey, isRoot} from "../state/treeUtils";
import {swapLeft, swapRight} from "../utils/array";
import {setChildren, setRoots} from "./actions";

export const swapSelectedNodeDown = (state: AppState, dispatch: Dispatch) => {
  if (isRoot(state, state.selectedNode)) {
    dispatch(setRoots(swapRight(state.rootNodes, state.selectedNode)));
  } else {

    const parent = getParentKey(state, state.selectedNode);
    const children = state.nodes[parent].children as string[];

    dispatch(setChildren(parent, swapRight(children, state.selectedNode)));
  }
};

export const swapSelectedNodeUp = (state: AppState, dispatch: Dispatch) => {
  if (isRoot(state, state.selectedNode)) {
    dispatch(setRoots(swapLeft(state.rootNodes, state.selectedNode)));
  } else {
    const parent = getParentKey(state, state.selectedNode);
    const children = state.nodes[parent].children as string[];

    dispatch(setChildren(parent, swapLeft(children, state.selectedNode)));
  }
};

