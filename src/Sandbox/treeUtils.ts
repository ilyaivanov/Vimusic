import {AppState, TreeDefinition, TreeNode} from "./types";
import {contains, last} from "../utils/array";

export const getContext = (state: AppState, nodeId: string): string[] => {
  if (state.rootNodes.indexOf(nodeId) >= 0) return state.rootNodes;
  const parentKey = getParentKey(state, nodeId);
  const {children} = state.nodes[parentKey];

  if (!children)
    throw new Error(
      `No children found for ${nodeId} and it doesn't exist in the root`
    );

  return children;
};

export interface Parent {
  parent: string;
  context: string[];
}

export const getParentContext = (state: AppState, nodeId: string): Parent => {
  let parentKey = getParentKey(state, nodeId);
  while (
    !isRoot(state, parentKey) &&
    last(getContext(state, parentKey)) == parentKey
    ) {
    parentKey = getParentKey(state, parentKey);
  }
  return {parent: parentKey, context: getContext(state, parentKey)};
};

export const getParentKey = (state: AppState, nodeId: string) => {
  const key = Object.keys(state.nodes).find(key =>
    contains(state.nodes[key].children, nodeId)
  );
  if (!key) throw new Error(`Couldn't find parent id for ${nodeId}`);
  return key;
};

export const getDeepestChild = (state: AppState, nodeId?: string) => {
  let node = nodeId || last(state.rootNodes);
  while (hasChildren(state, node) && !isNodeHidden(state, node)) {
    node = last(getChildren(state, node));
  }
  return node;
};

export const hasChildren = (state: AppState, nodeId: string) => {
  const children = getChildren(state, nodeId);
  return children && children.length > 0;
};

export const getChildren = (state: AppState, nodeId: string): string[] => {
  return state.nodes[nodeId].children || [];
};

export const isRoot = (state: AppState, nodeId: string) =>
  contains(state.rootNodes, nodeId);

export const appendNodes = (
  tree: TreeNode,
  nodeId: string,
  newNodes: TreeDefinition[]
): TreeNode => {
  const newTree = {...tree};
  newTree[nodeId] = {
    ...newTree[nodeId],
    children: newNodes.map(n => n.id)
  };
  newNodes.forEach(node => {
    newTree[node.id] = node;
  });
  return newTree;
};

export const updateNode = (
  state: AppState,
  nodeId: string,
  props: Partial<TreeDefinition>
) => {
  return {
    ...state,
    nodes: {
      ...state.nodes,
      [nodeId]: {
        ...state.nodes[nodeId],
        ...props
      }
    }
  };
};

export const isNodeHidden = (state: AppState, nodeId: string) =>
  state.nodes[nodeId].isChildrenHidden;

export const isNodeLoading = (state: AppState, nodeId: string) =>
  state.nodes[nodeId].isLoading;

export const isEditingCurrentNode = (state: AppState) =>
  state.nodes[state.selectedNode].isEditing;

export const createEmptyTree = (): AppState => ({
  rootNodes: [],
  selectedNode: '',
  nodes: {}
});
