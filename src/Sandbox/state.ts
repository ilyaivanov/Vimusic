import {Action, AppState} from "./types";
import {useReducer} from "react";
import {createApp} from "./initialState";
import {isFirst, isLast, nextItem, previousItem} from "../utils/array";
import {
  appendNodes,
  getChildren,
  getContext,
  getDeepestChild,
  getParentContext,
  getParentKey,
  hasChildren,
  isRoot
} from "./treeUtils";


const initial: AppState = {
  nodes: createApp(),
  rootNodes: ['1', '2', '3'],
  selectedNode: '1',
};

export const reducer = (state: AppState, action: Action): AppState => {

  if (
    action.type === 'ArrowLeft' && isRoot(state, state.selectedNode) ||
    action.type === 'ArrowUp' && isFirst(state.rootNodes, state.selectedNode) ||
    action.type === 'ArrowDown' && getDeepestChild(state) === state.selectedNode
  ) {
    return state;
  }

  if ((action.type === 'ArrowRight' || action.type == 'ArrowDown') && hasChildren(state, state.selectedNode)) {
    return setSelectedNode(state, getChildren(state, state.selectedNode)[0]);
  }

  if (action.type === 'ArrowRight') {
    const newNodes = createNewNodes(state.selectedNode);
    return {
      ...state,
      nodes: appendNodes(state.nodes, state.selectedNode, newNodes)
    };
  }

  if (action.type === 'ArrowLeft') {
    return setSelectedNode(state, getParentKey(state, state.selectedNode));
  }

  if (action.type == 'ArrowDown') {
    const context = getContext(state, state.selectedNode);
    if (isLast(context, state.selectedNode)) {
      const parentContext = getParentContext(state, state.selectedNode);
      return setSelectedNode(state, nextItem(parentContext.context, parentContext.parent));
    }

    return setSelectedNode(state, nextItem(context, state.selectedNode));
  }
  if (action.type == 'ArrowUp') {
    const context = getContext(state, state.selectedNode);
    if (isFirst(context, state.selectedNode)) {
      return setSelectedNode(state, getParentKey(state, state.selectedNode));
    }

    const previousNode = previousItem(context, state.selectedNode);
    return setSelectedNode(state, getDeepestChild(state, previousNode));
  }
  return state;
};


export const useAppState = () => {
  return useReducer(reducer, initial);
};

const setSelectedNode = (state: AppState, selectedNode: string) => {
  return {
    ...state,
    selectedNode,
  };
};


const createNewNodes = (currentNode: string) =>
  ['.1', '.2', '.3']
    .map(n => currentNode + n)
    .map(id => ({
      id,
      text: id,
    }));
