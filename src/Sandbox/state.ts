import {Action, AppState} from "./types";
import {useReducer} from "react";
import {createApp} from "./initialState";
import {contains, getNextItem, getPreviousItem, isFirst, isLast, last} from "../utils/array";


const initial: AppState = {
  nodes: createApp(),
  rootNodes: ['1', '2', '3'],
  selectedNode: '1',
};

export const reducer = (state: AppState, action: Action): AppState => {
  if (action.type == 'ArrowDown') {
    const children = state.nodes[state.selectedNode].children;
    if (children && children.length > 0) {
      return setSelectedNode(state, children[0]);
    }

    const context = getContext(state, state.selectedNode);
    if (isLast(context, state.selectedNode)) {
      const parentContext = getParentContext(state, state.selectedNode);
      if (isLast(parentContext.context, parentContext.parent))
        return state;
      return setSelectedNode(state, getNextItem(parentContext.context, parentContext.parent));
    }

    return setSelectedNode(state, getNextItem(context, state.selectedNode));
  }
  if (action.type == 'ArrowUp') {
    const context = getContext(state, state.selectedNode);
    if (isFirst(context, state.selectedNode)) {
      if (isRoot(state, state.selectedNode))
        return state;
      return setSelectedNode(state, getDirectParentContext(state, state.selectedNode).parent);
    }

    const previousNode = getPreviousItem(context, state.selectedNode);
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

const getContext = (state: AppState, nodeId: string): string[] => {
  if (state.rootNodes.indexOf(nodeId) >= 0)
    return state.rootNodes;
  const parentKey = getParentKey(state, nodeId);
  return state.nodes[parentKey].children as string[];
};

interface Parent {
  parent: string;
  context: string[];
}

const getDirectParentContext = (state: AppState, nodeId: string): Parent => {
  let parentKey = getParentKey(state, nodeId);
  return {parent: parentKey, context: getContext(state, parentKey)};
};

const getParentContext = (state: AppState, nodeId: string): Parent => {
  let parentKey = getParentKey(state, nodeId);
  while (!isRoot(state, parentKey) && last(getContext(state, parentKey)) == parentKey) {
    parentKey = getParentKey(state, parentKey);
  }
  return {parent: parentKey, context: getContext(state, parentKey)};
};

const getParentKey = (state: AppState, nodeId: string) =>
  Object
    .keys(state.nodes)
    .find(key => contains(state.nodes[key].children, nodeId)) as string;


const getDeepestChild = (state: AppState, nodeId: string) => {
  let node = nodeId;
  while (state.nodes[node].children) {
    node = last(state.nodes[node].children as string[]);
  }
  return node;
};

const isRoot = (state: AppState, nodeId: string) =>
  contains(state.rootNodes, nodeId);

