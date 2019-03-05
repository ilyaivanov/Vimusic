import { Action, TreeDefinition } from "../../types";

export const createNode = (placeBefore: string): Action => ({
  type: "CreateNode",
  placeBefore: placeBefore,
  props: { text: "New Node", isEditing: true }
});

export const deleteNode = (nodeId: string): Action => ({
  type: "Delete",
  nodeId
});

export const startEditNode = (nodeId: string): Action =>
  editAction(nodeId, { isEditing: true });

export const stopEditNode = (nodeId: string): Action =>
  editAction(nodeId, { isEditing: false });

export const showChildren = (nodeId: string): Action =>
  editAction(nodeId, { isChildrenHidden: false });

export const hideChildren = (nodeId: string): Action =>
  editAction(nodeId, { isChildrenHidden: true });

export const startLoading = (nodeId: string): Action =>
  editAction(nodeId, { isLoading: true });

export const endLoading = (nodeId: string): Action =>
  editAction(nodeId, { isLoading: false });

export const setChildren = (nodeId: string, children: string[]): Action =>
  editAction(nodeId, { children });

export const setRoots = (roots: string[]): Action => ({
  type: "SET_ROOTS",
  roots
});

const editAction = (nodeId: string, props: Partial<TreeDefinition>): Action => ({
  type: "EditNode",
  nodeId,
  props
});

export const selectNode = (nodeId: string): Action => ({ type: "SELECT_NODE", nodeId });
