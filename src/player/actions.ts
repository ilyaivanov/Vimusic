import { PlayerAction } from "./types";

export const playVideo = (youtubeVideoId: string): PlayerAction => ({
  type: "PLAY_VIDEO",
  youtubeVideoId
});

export const togglePlay = (): PlayerAction => ({
  type: "TOGGLE_PLAY"
});
