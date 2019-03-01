import {AppState, Dispatch} from "../types";

export const playSelectedNode = (state: AppState, dispatch: Dispatch) => {
  console.log('Playing video ', state.nodes[state.selectedNode].youtubeId)
};
