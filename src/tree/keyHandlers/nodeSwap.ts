import {AppState, Dispatch} from "../../types";
import {getParentKey, isRoot} from "../treeUtils";
import {getPrevious, insertAfter, isFirst, removeItem, swapLeft, swapRight} from "../../utils/array";
import {setChildren, setRoots} from "./actions";

export const swapSelectedNodeDown = (state: AppState, dispatch: Dispatch) => {
  applySwapMove(state, dispatch, swapRight);
};

export const swapSelectedNodeUp = (state: AppState, dispatch: Dispatch) => {
  applySwapMove(state, dispatch, swapLeft);
};

export const swapSelectedNodeRight = (state: AppState, dispatch: Dispatch) => {
  const context = isRoot(state, state.selectedNode) ?
    state.rootNodes :
    getChildren(state, getParentKey(state, state.selectedNode));

  if (!isFirst(context, state.selectedNode)) {
    removeSelectedFromContext(state, dispatch, context);
    appendSelectedToPreviousNode(state, dispatch, context);
  }
};

export const swapSelectedNodeLeft = (state: AppState, dispatch: Dispatch) => {
  if (!isRoot(state, state.selectedNode)) {
    const parent = getParentKey(state, state.selectedNode);

    insertSelectedInParent(state, dispatch, parent);
    removeSelectedFromContext(state, dispatch, getChildren(state, parent));
  }
};

const applySwapMove = (state: AppState, dispatch: Dispatch, swap: (context: string[], nodeId: string) => string[]) => {
  if (isRoot(state, state.selectedNode)) {
    dispatch(setRoots(swap(state.rootNodes, state.selectedNode)));
  } else {

    const parent = getParentKey(state, state.selectedNode);
    const children = getChildren(state, parent);

    dispatch(setChildren(parent, swap(children, state.selectedNode)));
  }
};

const removeSelectedFromContext = (state: AppState, dispatch: Dispatch, context: string[]) => {
  const newRoots = [...context];
  removeItem(newRoots, state.selectedNode);
  if (isRoot(state, state.selectedNode)) {
    dispatch(setRoots(newRoots));
  } else {
    dispatch(setChildren(getParentKey(state, state.selectedNode), newRoots));
  }
};

const insertSelectedInParent = (state: AppState, dispatch: Dispatch, parentId: string) => {
  let children: string[];
  if (isRoot(state, parentId)) {
    children = state.rootNodes;
  } else {
    const grandParent = getParentKey(state, parentId);
    children = getChildren(state, grandParent);
  }
  const newChildren = insertAfter(children, parentId, state.selectedNode);
  if (isRoot(state, parentId)) {
    dispatch(setRoots(newChildren));
  } else {
    dispatch(setChildren(getParentKey(state, parentId), newChildren));
  }
};

const appendSelectedToPreviousNode = (state: AppState, dispatch: Dispatch, context: string[]) => {
  const previousNode = getPrevious(context, state.selectedNode);
  dispatch(setChildren(previousNode, getChildren(state, previousNode).concat([state.selectedNode])))
};

const getChildren = (state: AppState, nodeId: string): string[] =>
  state.nodes[nodeId].children || [] as string[]
