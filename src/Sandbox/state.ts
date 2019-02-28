import { Action, AppState, TreeNode } from "./types";
import { useReducer } from "react";
import { createApp } from "./initialState";
import { isFirst, isLast, nextItem, previousItem } from "../utils/array";
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
import { Video } from "../api";

const initial: AppState = {
  nodes: createApp(),
  rootNodes: ["1", "2", "3"],
  selectedNode: "1"
};

export const reducer = (state: AppState, action: Action): AppState => {
  console.log(action);

  if (action.type === "SET_NODES") {
    const videos: Video[] = (action as any).videos;
    const tree: TreeNode = {};
    videos.forEach(v => {
      tree[v.id] = {
        ...v
      };
    });
    return {
      selectedNode: videos[0].id,
      nodes: tree,
      rootNodes: videos.map(v => v.id)
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
      return updateNode(state, state.selectedNode, { isChildrenHidden: false });
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
      return updateNode(state, state.selectedNode, { isChildrenHidden: true });
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
  return state;
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
