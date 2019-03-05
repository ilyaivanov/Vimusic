import React, { useEffect } from "react";
import { connect, Provider } from "react-redux";
import store from "./store";
import { playVideo, togglePlay } from "./actions";
import { PlayerState } from "./types";
import YoutubePlayer from "./YoutubePlayer";
import { useKeyboard } from "../utils/hooks";

export default ({ videoId }: { videoId: string }) => {

  useEffect(() => {
    if (videoId)
      store.dispatch(playVideo(videoId));
  }, [videoId]);

  return <Provider store={store}>
    <MyButtonMapped/>
  </Provider>;
}

interface Props {
  youtubeId?: string;
  isPlaying: boolean;
  togglePlay: typeof togglePlay;
}

const MyButton = ({ youtubeId, isPlaying, togglePlay }: Props) => {
  useKeyboard((event) => {
    if (event.code === "Space" && youtubeId) {
      togglePlay();
    }
  });

  return (
    <YoutubePlayer id={youtubeId} visible playing={isPlaying}/>
  );
};


const mapState = (state: PlayerState) => ({
  isPlaying: state.isPlaying,
  youtubeId: state.youtubeVideoId
});

const MyButtonMapped = connect(mapState, { togglePlay })(MyButton);














