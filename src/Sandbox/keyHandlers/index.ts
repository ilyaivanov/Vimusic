import {AppState, Dispatch} from "../types";
import {handleArrowDown, handleArrowUp} from "./traversal";
import {playSelectedNode} from "./player";

export const onKeyPress = (event: KeyboardEvent, state: AppState, dispatch: Dispatch) => {
  if (event.code === 'ArrowDown') {
    handleArrowDown(state, dispatch);
  }
  if (event.code === 'ArrowUp') {
    handleArrowUp(state, dispatch);
  }
  if (event.code === 'KeyP') {
    playSelectedNode(state, dispatch);
  }
};
