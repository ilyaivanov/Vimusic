import {AppState, Dispatch} from "../types";
import {handleArrowDown, handleArrowUp} from "./traversal";

export const onKeyPress = (event: KeyboardEvent, state: AppState, dispatch: Dispatch) => {
  if (event.code === 'ArrowDown') {
    handleArrowDown(state, dispatch);
  }
  if (event.code === 'ArrowUp') {
    handleArrowUp(state, dispatch);
  }
};
