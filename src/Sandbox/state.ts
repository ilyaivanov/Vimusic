import {Action, AppState, TreeNode} from "./types";
import {useReducer} from "react";
import {createApp} from "./initialState";
import {getPrevious, insertBefore, isFirst, isLast, nextItem, previousItem, removeItem} from "../utils/array";
import {
  appendNodes,
  getChildren,
  getContext,
  getDeepestChild,
  getParentContext,
  getParentKey,
  hasChildren,
  isNodeHidden,
  isRoot,
  updateNode
} from "./treeUtils";

const initial: AppState = {
  nodes: createApp(),
  rootNodes: ["1", "2", "3"],
  selectedNode: "1"
};

export const reducer = (state: AppState, action: Action): AppState => {
  if (action.type === "SET_NODES") {
    const {nodes}= action;
    const tree: TreeNode = {};
    nodes.forEach(v => {
      tree[v.id] = {
        ...v
      };
    });
    return {
      selectedNode: nodes[0].id,
      nodes: tree,
      rootNodes: nodes.map(v => v.id)
    };
  }

  if (
    (action.type === "ArrowUp" &&
      isFirst(state.rootNodes, state.selectedNode)) ||
    (action.type === "ArrowDown" &&
      getDeepestChild(state) === state.selectedNode)
  ) {
    return state;
  }

  if (action.type === "ArrowRight") {
    if (state.nodes[state.selectedNode].isChildrenHidden) {
      return updateNode(state, state.selectedNode, {isChildrenHidden: false});
    }
    if (hasChildren(state, state.selectedNode)) {
      return setSelectedNode(state, getChildren(state, state.selectedNode)[0]);
    }
    const newNodes = createNewNodes(state.selectedNode);
    return {
      ...state,
      nodes: appendNodes(state.nodes, state.selectedNode, newNodes)
    };
  }

  if (action.type === "ArrowLeft") {
    if (
      !isNodeHidden(state, state.selectedNode) &&
      hasChildren(state, state.selectedNode)
    ) {
      return updateNode(state, state.selectedNode, {isChildrenHidden: true});
    }
    if (isRoot(state, state.selectedNode)) return state;
    return setSelectedNode(state, getParentKey(state, state.selectedNode));
  }

  if (action.type == "ArrowDown") {
    if (
      hasChildren(state, state.selectedNode) &&
      !isNodeHidden(state, state.selectedNode)
    ) {
      return setSelectedNode(state, getChildren(state, state.selectedNode)[0]);
    }

    const context = getContext(state, state.selectedNode);
    if (isLast(context, state.selectedNode)) {
      const parentContext = getParentContext(state, state.selectedNode);
      return setSelectedNode(
        state,
        nextItem(parentContext.context, parentContext.parent)
      );
    }

    return setSelectedNode(state, nextItem(context, state.selectedNode));
  }
  if (action.type == "ArrowUp") {
    const context = getContext(state, state.selectedNode);
    if (isFirst(context, state.selectedNode)) {
      return setSelectedNode(state, getParentKey(state, state.selectedNode));
    }

    const previousNode = previousItem(context, state.selectedNode);
    return setSelectedNode(state, getDeepestChild(state, previousNode));
  }

  //TODO: consider to remove thoose into separate reducer
  if (action.type == "EditNode") {
    return updateNode(state, action.nodeId, action.props);
  }
  if (action.type == "CreateNode") {
    const newId = action.props.id || Math.random() + '';
    const withNode = updateNode(state, newId, {
      ...action.props,
      id: newId,
    });
    if (isRoot(state, action.placeBefore)) {
      withNode.rootNodes = insertBefore(withNode.rootNodes, action.placeBefore, newId);
    } else {
      withNode.nodes[getParentKey(state, action.placeBefore)] = {
        ...withNode.nodes[getParentKey(state, action.placeBefore)],
        children:
        // @ts-ignore
          insertBefore(withNode.nodes[getParentKey(state, action.placeBefore)].children, action.placeBefore, newId)
      };
    }
    withNode.selectedNode = newId;
    return withNode;
  }

  if (action.type == 'Delete') {
    // const parent =
    const newnodes = {
      ...state.nodes,
    };
    const context = getContext(state, action.nodeId);

    let nextSelectedNode: string;
    if (context.length === 1) {
      nextSelectedNode = getParentKey(state, action.nodeId);
    } else if (isFirst(context, action.nodeId)) {
      nextSelectedNode = context[1];
    } else {
      nextSelectedNode = getPrevious(context, action.nodeId);
    }

    deleteAllChildren(newnodes, action.nodeId);

    delete newnodes[action.nodeId];


    //TODO: remove state mutation
    let newRoot = state.rootNodes;
    if (isRoot(state, action.nodeId)) {
      removeItem(newRoot, action.nodeId);
    } else {
      removeItem(newnodes[getParentKey(state, action.nodeId)].children, action.nodeId);
    }

    return {
      ...state,
      rootNodes: newRoot,
      selectedNode: nextSelectedNode,
      nodes: newnodes
    }
  }

  if(action.type === 'SELECT_NODE'){
    return {
      ...state,
      selectedNode: action.nodeId
    }
  }
  return state;
};

const deleteAllChildren = (tree: TreeNode, nodeId: string) => {
  const children = tree[nodeId].children;
  if (children) {
    children.forEach(c => {
      deleteAllChildren(tree, c);

      delete tree[c];
    });
  }
};

export const useAppState = () => {
  return useReducer(reducer, initial);
};

const setSelectedNode = (state: AppState, selectedNode: string) => {
  return {
    ...state,
    selectedNode
  };
};

const createNewNodes = (currentNode: string) =>
  [".1", ".2", ".3"]
    .map(n => currentNode + n)
    .map(id => ({
      id,
      text: id
    }));
