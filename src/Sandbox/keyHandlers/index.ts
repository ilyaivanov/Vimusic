import {AppState, Dispatch} from "../types";
import {handleTraversal} from "./traversal";
import {createNode, deleteNode, startEditNode, stopEditNode} from "./editing";
import {isEditingCurrentNode} from "../treeUtils";

export const onKeyPress = (event: KeyboardEvent, state: AppState, dispatch: Dispatch) => {
  handleTraversal(event, state, dispatch);

  if (event.code === 'Enter') {
    if (state.rootNodes.length > 0 && isEditingCurrentNode(state)) {
      stopEditNode(state, dispatch);
    } else {
      createNode(state, dispatch);
    }
  }
  if (event.code === 'F2') {
    startEditNode(state, dispatch);
  }
  if (event.code === 'Backspace') {
    deleteNode(state, dispatch);
  }
};



