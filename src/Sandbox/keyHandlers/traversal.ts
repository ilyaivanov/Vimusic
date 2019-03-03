import {Action, AppState, AppStateActionCreator, Dispatch, TreeDefinition} from "../types";
import {
  getChildren,
  getContext,
  getDeepestChild,
  getParentContext,
  getParentKey,
  hasChildren,
  isEditingCurrentNode,
  isNodeHidden
} from "../treeUtils";
import {isFirst, isLast, nextItem, previousItem} from "../../utils/array";
import {endLoading, startLoading, stopEditNode} from "./editing";
import {fetchSimilarVideos, Video} from "../../api";

type Codes = {
  [id: string]: AppStateActionCreator | undefined;
}

const codes: Codes = {
  'ArrowDown': moveNodeDown,
  'ArrowUp': moveNodeUp,
  'ArrowRight': moveNodeRight,
};

export const handleTraversal = (event: KeyboardEvent, state: AppState, dispatch: Dispatch) => {
  if (state.rootNodes.length === 0)
    return;

  const handler = codes[event.code];
  if (handler) {
    //TODO: add a handler to check if we are going to move away
    //or maybe each handler would return true or false if the node moved away
    //note that stopEditNode is using selected node
    //Currently you are going to stop editing even if you click down with only one item in a list
    if (isEditingCurrentNode(state)) {
      stopEditNode(state, dispatch);
    }

    handler(state, dispatch);
  }
};

function moveNodeDown(state: AppState, dispatch: Dispatch) {
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
}

function moveNodeUp(state: AppState, dispatch: Dispatch) {
  if (isFirst(state.rootNodes, state.selectedNode))
    return;

  const context = getContext(state, state.selectedNode);
  if (isFirst(context, state.selectedNode)) {
    dispatch({type: 'SELECT_NODE', nodeId: getParentKey(state, state.selectedNode)});
  } else {
    const previousNode = previousItem(context, state.selectedNode);
    dispatch({type: 'SELECT_NODE', nodeId: getDeepestChild(state, previousNode)});
  }
}


function moveNodeRight(state: AppState, dispatch: Dispatch) {
  if (!hasChildren(state, state.selectedNode)) {
    dispatch(startLoading(state.selectedNode));

    fetchSimilarVideos(state.nodes[state.selectedNode].youtubeId as string)
      .then((videos) => {
        dispatch(endLoading(state.selectedNode));
        dispatch(setVideosAsChildren(state.selectedNode, videos))
      });
  }
}

export const setVideosAsChildren = (nodeId: string, videos: Video[]): Action => {
  const children: TreeDefinition[] = videos.map(video =>
    ({id: Math.random() + '', text: video.text, youtubeId: video.id})
  );
  return {
    type: "SET_CHILDREN",
    parentId: nodeId,
    children
  }
};
