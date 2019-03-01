import {AppState, Dispatch} from "../types";
import {
  getChildren,
  getContext,
  getDeepestChild,
  getParentContext,
  getParentKey,
  hasChildren,
  isNodeHidden
} from "../treeUtils";
import {isFirst, isLast, nextItem, previousItem} from "../../utils/array";

export const handleArrowDown = (state: AppState, dispatch: Dispatch) => {
  if (getDeepestChild(state) === state.selectedNode)
    return;

  if (
    hasChildren(state, state.selectedNode) &&
    !isNodeHidden(state, state.selectedNode)
  ) {
    dispatch({type: 'SELECT_NODE', nodeId: getChildren(state, state.selectedNode)[0]});
  } else {
    const context = getContext(state, state.selectedNode);
    if (isLast(context, state.selectedNode)) {
      const parentContext = getParentContext(state, state.selectedNode);
      dispatch({type: 'SELECT_NODE', nodeId: nextItem(parentContext.context, parentContext.parent)});
    } else {
      dispatch({type: 'SELECT_NODE', nodeId: nextItem(context, state.selectedNode)});
    }
  }
};

export const handleArrowUp = (state: AppState, dispatch: Dispatch) => {
  if (isFirst(state.rootNodes, state.selectedNode))
    return;

  const context = getContext(state, state.selectedNode);
  if (isFirst(context, state.selectedNode)) {
    dispatch({type: 'SELECT_NODE', nodeId: getParentKey(state, state.selectedNode)});
  } else {
    const previousNode = previousItem(context, state.selectedNode);
    dispatch({type: 'SELECT_NODE', nodeId: getDeepestChild(state, previousNode)});
  }
};
