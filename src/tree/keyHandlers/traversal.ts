import { AppState, AppStateActionCreator, Dispatch, TreeAction, TreeDefinition } from "../../types";
import {
  getChildren,
  getContext,
  getDeepestChild,
  getParentContext,
  getParentKey,
  hasChildren,
  isEditingCurrentNode,
  isNodeHidden,
  isNodeLoading,
  isRoot
} from "../treeUtils";
import { isFirst, isLast, nextItem, previousItem } from "../../utils/array";
import { endLoading, hideChildren, selectNode, showChildren, startLoading, stopEditNode } from "./actions";
import { fetchSimilarVideos, Video } from "../../api";

type Codes = {
  [id: string]: AppStateActionCreator | undefined;
}

const codes: Codes = {
  "ArrowDown": moveNodeDown,
  "ArrowUp": moveNodeUp,
  "ArrowRight": moveNodeRight,
  "ArrowLeft": moveNodeLeft
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
      dispatch(stopEditNode(state.selectedNode));
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
    dispatch(selectNode(getChildren(state, state.selectedNode)[0]));
  } else {
    const context = getContext(state, state.selectedNode);
    if (isLast(context, state.selectedNode)) {
      const parentContext = getParentContext(state, state.selectedNode);
      dispatch(selectNode(nextItem(parentContext.context, parentContext.parent)));
    } else {
      dispatch(selectNode(nextItem(context, state.selectedNode)));
    }
  }
}

function moveNodeUp(state: AppState, dispatch: Dispatch) {
  if (isFirst(state.rootNodes, state.selectedNode))
    return;

  const context = getContext(state, state.selectedNode);
  if (isFirst(context, state.selectedNode)) {
    dispatch(selectNode(getParentKey(state, state.selectedNode)));
  } else {
    const previousNode = previousItem(context, state.selectedNode);
    dispatch(selectNode(getDeepestChild(state, previousNode)));
  }
}


function moveNodeRight(state: AppState, dispatch: Dispatch) {
  if (isNodeLoading(state, state.selectedNode))
    return;

  if (!hasChildren(state, state.selectedNode)) {
    dispatch(startLoading(state.selectedNode));

    fetchSimilarVideos(state.nodes[state.selectedNode].youtubeId as string)
      .then((videos) => {
        dispatch(endLoading(state.selectedNode));
        dispatch(setVideosAsChildren(state.selectedNode, videos));
      });
  } else if (isNodeHidden(state, state.selectedNode)) {
    dispatch(showChildren(state.selectedNode));
  } else {
    return dispatch(selectNode(getChildren(state, state.selectedNode)[0]));
  }
}


function moveNodeLeft(state: AppState, dispatch: Dispatch) {
  if (
    !isNodeHidden(state, state.selectedNode) &&
    hasChildren(state, state.selectedNode)
  ) {
    dispatch(hideChildren(state.selectedNode));
  } else if (!isRoot(state, state.selectedNode)) {
    dispatch(selectNode(getParentKey(state, state.selectedNode)));
  }
}

export const setVideosAsChildren = (nodeId: string, videos: Video[]): TreeAction => {
  const children: TreeDefinition[] = videos.map(video =>
    ({ id: Math.random() + "", text: video.text, youtubeId: video.id, image: video.imagePreview })
  );
  return {
    type: "SET_CHILDREN",
    parentId: nodeId,
    children
  };
};

