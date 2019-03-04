import {Action, AppState, TreeNode} from "../types";
import {useReducer} from "react";
import {getPrevious, insertBefore, isFirst, removeItem} from "../utils/array";
import {createEmptyTree, getContext, getParentKey, isRoot, updateNode} from "./treeUtils";

export const reducer = (state: AppState, action: Action): AppState => {

  if (action.type === 'RESTORE') {
    return action.savedState;
  }

  if (action.type === "SET_NODES") {
    const {nodes} = action;
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
    if (state.rootNodes.length === 0 || isRoot(state, action.placeBefore)) {
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
    const context = getContext(state, action.nodeId);

    //Roots are tricky special cases
    if (isRoot(state, action.nodeId) && context.length === 1) {
      return createEmptyTree();
    }


    // const parent =
    const newnodes = {
      ...state.nodes,
    };

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

  if (action.type === 'SELECT_NODE') {
    return {
      ...state,
      selectedNode: action.nodeId
    }
  }
  if (action.type === 'SET_CHILDREN') {
    const nodeId = action.parentId;
    const newState: AppState = {
      ...state,
      nodes: {
        ...state.nodes,
        [nodeId]: {
          ...state.nodes[nodeId],
          children: action.children.map(c => c.id)
        }
      },
    };
    action.children.forEach(child => {
      newState.nodes[child.id] = child;
    });

    return newState;
  }

  if (action.type === 'SET_ROOTS') {
    return {
      ...state,
      rootNodes: action.roots
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
  return useReducer(reducer, createEmptyTree());
};
