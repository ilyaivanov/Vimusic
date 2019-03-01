import {useReducer} from "react";

interface PlayerState {
  isPlaying: boolean
  youtubeVideoId?: string;
}

interface PlayAction {
  type: 'PLAY',
  youtubeVideoId: string;
}

interface StopAction {
  type: 'STOP'
}

type PlayerAction = PlayAction | StopAction;

const reducer = (state: PlayerState, action: PlayerAction): PlayerState => {
  if (action.type === 'PLAY') {
    return {
      ...state,
      isPlaying: true,
      youtubeVideoId: action.youtubeVideoId
    }
  }
  if (action.type === 'STOP') {
    return {
      ...state,
      isPlaying: false,
      youtubeVideoId: undefined
    }
  }
  return state;
};

export const usePlayer = () => {
  return useReducer(reducer, {isPlaying: false});
};
