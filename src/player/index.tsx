import React from "react";
import { connect } from "react-redux";
import { togglePlay } from "./actions";
import YoutubePlayer from "./YoutubePlayer";
import { useKeyboard } from "../utils/hooks";
import { State } from "../types";

interface Props {
  youtubeId?: string;
  isPlaying: boolean;
  togglePlay: typeof togglePlay;
}

//  const handlePlayerKeys = (event: KeyboardEvent, context: AppState) => {
//     if (event.code === "KeyP" && !isEditingCurrentNode(context)) {
//       const node = context.nodes[context.selectedNode];
//       if (!node.youtubeId) {
//         console.warn(node, "Expected to have 'youtubeId' property, but it didn't");
//       } else {
//         playVideo(node.youtubeId);
//       }
//     }
//   };

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

const mapState = (state: State) => ({
  isPlaying: state.player.isPlaying,
  youtubeId: state.player.youtubeVideoId
});

export default connect(mapState, { togglePlay })(MyButton);














