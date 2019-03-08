import { TreeAction, TreeDefinition } from "../../types";

export const createNode = (placeBefore: string): TreeAction => ({
  type: "CreateNode",
  placeBefore: placeBefore,
  props: { text: "New Node", isEditing: true }
});

export const deleteNode = (nodeId: string): TreeAction => ({
  type: "Delete",
  nodeId
});

export const setNodes = (nodes: TreeDefinition[]): TreeAction => ({
  type: "SET_NODES",
  selection: "search",
  nodes
});

export const startEditNode = (nodeId: string): TreeAction =>
  editAction(nodeId, { isEditing: true });

export const stopEditNode = (nodeId: string): TreeAction =>
  editAction(nodeId, { isEditing: false });

export const showChildren = (nodeId: string): TreeAction =>
  editAction(nodeId, { isChildrenHidden: false });

export const hideChildren = (nodeId: string): TreeAction =>
  editAction(nodeId, { isChildrenHidden: true });

export const startLoading = (nodeId: string): TreeAction =>
  editAction(nodeId, { isLoading: true });

export const endLoading = (nodeId: string): TreeAction =>
  editAction(nodeId, { isLoading: false });

export const setChildren = (nodeId: string, children: string[]): TreeAction =>
  editAction(nodeId, { children });

export const setRoots = (roots: string[]): TreeAction => ({
  type: "SET_ROOTS",
  roots
});

export const editAction = (nodeId: string, props: Partial<TreeDefinition>): TreeAction => ({
  type: "EditNode",
  nodeId,
  props
});

export const selectNode = (nodeId: string): TreeAction => ({ type: "SELECT_NODE", nodeId });
