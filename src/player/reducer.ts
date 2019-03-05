import { PlayerAction, PlayerState } from "./types";

const initial: PlayerState = {
  youtubeVideoId: undefined,
  isPlaying: false
};

export default (state = initial, action: PlayerAction): PlayerState => {
  if (action.type === "PLAY_VIDEO") {
    return {
      ...state,
      isPlaying: true,
      youtubeVideoId: action.youtubeVideoId
    };
  }
  if (action.type === "TOGGLE_PLAY") {
    return {
      ...state,
      isPlaying: !state.isPlaying
    };
  }
  return state;
};
