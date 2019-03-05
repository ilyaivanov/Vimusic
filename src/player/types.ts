import { Store } from "redux";

export interface PlayerState {
  isPlaying: boolean
  youtubeVideoId?: string;
}

export interface PlayVideoAction {
  type: 'PLAY_VIDEO',
  youtubeVideoId: string;
}

export interface TogglePlayAction {
  type: 'TOGGLE_PLAY',
}

export type PlayerStore = Store<PlayerState, PlayerAction>;

export type PlayerAction = TogglePlayAction | PlayVideoAction;
