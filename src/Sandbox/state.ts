import {Action, AppState, TreeDefinition, TreeNode} from "./types";
import {useReducer} from "react";
import {createApp} from "./initialState";
import {contains, isFirst, isLast, last, nextItem, previousItem} from "../utils/array";


const initial: AppState = {
  nodes: createApp(),
  rootNodes: ['1', '2', '3'],
  selectedNode: '1',
};

export const reducer = (state: AppState, action: Action): AppState => {
  if ((action.type === 'ArrowRight' || action.type == 'ArrowDown') && hasChildren(state, state.selectedNode)) {
    return setSelectedNode(state, getChildren(state, state.selectedNode)[0]);
  }

  if (action.type === 'ArrowRight') {
    const newNodes = createNewNodes(state.selectedNode);
    return {
      ...state,
      selectedNode: newNodes[0].id,
      nodes: appendNodeto(state.nodes, state.selectedNode, newNodes)
    };
  }

  if (action.type === 'ArrowLeft') {
    if (isRoot(state, state.selectedNode))
      return state;
    return {
      ...state,
      selectedNode: getParentKey(state, state.selectedNode),
    };
  }

  if (action.type == 'ArrowDown') {
    const context = getContext(state, state.selectedNode);
    if (isLast(context, state.selectedNode)) {
      const parentContext = getParentContext(state, state.selectedNode);
      if (isLast(parentContext.context, parentContext.parent))
        return state;
      return setSelectedNode(state, nextItem(parentContext.context, parentContext.parent));
    }

    return setSelectedNode(state, nextItem(context, state.selectedNode));
  }
  if (action.type == 'ArrowUp') {
    const context = getContext(state, state.selectedNode);
    if (isFirst(context, state.selectedNode)) {
      if (isRoot(state, state.selectedNode))
        return state;
      return setSelectedNode(state, getDirectParentContext(state, state.selectedNode).parent);
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

const getContext = (state: AppState, nodeId: string): string[] => {
  if (state.rootNodes.indexOf(nodeId) >= 0)
    return state.rootNodes;
  const parentKey = getParentKey(state, nodeId);
  const {children} = state.nodes[parentKey];

  if (!children)
    throw new Error(`No children found for ${nodeId} and it doesn't exist in the root`);

  return children;
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

const getParentKey = (state: AppState, nodeId: string) => {
  const key = Object
    .keys(state.nodes)
    .find(key => contains(state.nodes[key].children, nodeId));
  if (!key)
    throw new Error(`Couldn't find parent id for ${nodeId}`);
  return key;
};


const getDeepestChild = (state: AppState, nodeId: string) => {
  let node = nodeId;
  while (hasChildren(state, node)) {
    node = last(getChildren(state, node));
  }
  return node;
};

const hasChildren = (state: AppState, nodeId: string) => {
  const children = getChildren(state, nodeId);
  return children && children.length > 0;
};

const getChildren = (state: AppState, nodeId: string): string[] => {
  return state.nodes[nodeId].children || [];
};

const isRoot = (state: AppState, nodeId: string) =>
  contains(state.rootNodes, nodeId);


const appendNodeto = (tree: TreeNode, nodeId: string, newNodes: TreeDefinition[]): TreeNode => {
  const newTree = {...tree};
  newTree[nodeId] = {
    ...newTree[nodeId],
    children: newNodes.map(n => n.id),
  };
  newNodes.forEach(node => {
    newTree[node.id] = node;
  });
  return newTree;
};

const createNewNodes = (currentNode: string) =>
  ['.1', '.2', '.3']
    .map(n => currentNode + n)
    .map(id => ({
      id,
      text: id,
    }));
