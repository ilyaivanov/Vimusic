import {Action, AppStateActionCreator, TreeDefinition} from "../types";

export const createNode: AppStateActionCreator = (state, dispatch) => {
  dispatch({
    type: "CreateNode",
    placeBefore: state.selectedNode,
    props: {text: 'New Node', isEditing: true}
  });
};

export const deleteNode: AppStateActionCreator = (state, dispatch) => {
  dispatch({
    type: "Delete",
    nodeId: state.selectedNode
  });
};

export const startEditNode = (nodeId: string): Action =>
  editAction(nodeId, {isEditing: true});

export const stopEditNode = (nodeId: string): Action =>
  editAction(nodeId, {isEditing: false});

export const showChildren = (nodeId: string): Action =>
  editAction(nodeId, {isChildrenHidden: false});

export const hideChildren = (nodeId: string): Action =>
  editAction(nodeId, {isChildrenHidden: true});

export const startLoading = (nodeId: string): Action =>
  editAction(nodeId, {isLoading: true});

export const endLoading = (nodeId: string): Action =>
  editAction(nodeId, {isLoading: false});

const editAction = (nodeId: string, props: Partial<TreeDefinition>): Action => ({
  type: "EditNode",
  nodeId,
  props
});

export const selectNode = (nodeId: string): Action => ({type: 'SELECT_NODE', nodeId});
