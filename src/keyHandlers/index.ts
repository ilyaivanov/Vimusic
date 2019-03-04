import {AppState, Dispatch} from "../types";
import {handleTraversal} from "./traversal";
import {createNode, deleteNode, startEditNode, stopEditNode} from "./actions";
import {isEditingCurrentNode} from "../state/treeUtils";
import {swapSelectedNodeDown, swapSelectedNodeLeft, swapSelectedNodeRight, swapSelectedNodeUp} from "./nodeSwap";

export const onKeyPress = (event: KeyboardEvent, state: AppState, dispatch: Dispatch) => {
  if (isSwapping(event, 'ArrowDown')) {
    swapSelectedNodeDown(state, dispatch);
  } else if (isSwapping(event, 'ArrowUp')) {
    swapSelectedNodeUp(state, dispatch);
  } else if (isSwapping(event, 'ArrowLeft')) {
    swapSelectedNodeLeft(state, dispatch);
  } else if (isSwapping(event, 'ArrowRight')) {
    swapSelectedNodeRight(state, dispatch);
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


const isSwapping = (event: KeyboardEvent, key: string) =>
  event.shiftKey && event.metaKey && event.code === key;


