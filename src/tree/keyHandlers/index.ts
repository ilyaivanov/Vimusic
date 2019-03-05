import { AppState, Dispatch, State } from "../../types";
import { handleTraversal } from "./traversal";
import { createNode, deleteNode, startEditNode, stopEditNode } from "./actions";
import { isEditingCurrentNode } from "../treeUtils";
import { swapSelectedNodeDown, swapSelectedNodeLeft, swapSelectedNodeRight, swapSelectedNodeUp } from "./nodeSwap";

export const onKeyPress = (event: KeyboardEvent, getState: () => State, dispatch: Dispatch) => {
  const overallState = getState();
  let state: AppState = {} as any;

  if (overallState.userSettings.selection === "favorites") {
    state = overallState.favorites;
  } else if (overallState.userSettings.selection === "search") {
    state = overallState.search;
  } else {
    return;
  }

  if (event.code === "Enter") {
    if (state.rootNodes.length > 0 && isEditingCurrentNode(state)) {
      dispatch(stopEditNode(state.selectedNode));
    } else {
      dispatch(createNode(state.selectedNode));
    }
  }

  //do not handle any more nodes
  if (state.rootNodes.length > 0 && isEditingCurrentNode(state)) {
    return;
  }


  if (isSwapping(event, "ArrowDown")) {
    swapSelectedNodeDown(state, dispatch);
  } else if (isSwapping(event, "ArrowUp")) {
    swapSelectedNodeUp(state, dispatch);
  } else if (isSwapping(event, "ArrowLeft")) {
    swapSelectedNodeLeft(state, dispatch);
  } else if (isSwapping(event, "ArrowRight")) {
    swapSelectedNodeRight(state, dispatch);
  } else {
    handleTraversal(event, state, dispatch);
  }

  if (event.code === "F2") {
    dispatch(startEditNode(state.selectedNode));
  }
  if (event.code === "Backspace") {
    dispatch(deleteNode(state.selectedNode));
  }
};


const isSwapping = (event: KeyboardEvent, key: string) =>
  event.shiftKey && event.metaKey && event.code === key;


