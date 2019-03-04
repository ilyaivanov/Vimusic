import {AppState, Dispatch} from "../types";
import {handleTraversal} from "./traversal";
import {createNode, deleteNode, startEditNode, stopEditNode} from "./actions";
import {isEditingCurrentNode} from "../state/treeUtils";
import {swapSelectedNodeDown, swapSelectedNodeUp} from "./nodeSwap";

export const onKeyPress = (event: KeyboardEvent, state: AppState, dispatch: Dispatch) => {

  if (event.shiftKey && event.metaKey && event.code === 'ArrowDown') {
    swapSelectedNodeDown(state, dispatch);
  } else if (event.shiftKey && event.metaKey && event.code === 'ArrowUp') {
    swapSelectedNodeUp(state, dispatch);
  } else {
    handleTraversal(event, state, dispatch);
  }

  if (event.code === 'Enter') {
    if (state.rootNodes.length > 0 && isEditingCurrentNode(state)) {
      dispatch(stopEditNode(state.selectedNode));
    } else {
      createNode(state, dispatch);
    }
  }

  if (event.code === 'F2') {
    dispatch(startEditNode(state.selectedNode));
  }
  if (event.code === 'Backspace') {
    deleteNode(state, dispatch);
  }
};



