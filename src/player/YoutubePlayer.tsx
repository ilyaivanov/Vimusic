import * as React from "react";
import { useEffect, useState } from "react";

import Youtube from "react-youtube";

interface Props {
  visible: boolean;
  playing: boolean;
  id?: string;
}

export default ({ visible, id, playing }: Props) => {
  if (!id)
    return null;

  const [player, setPlayer] = useState();

  useEffect(() => {
    if (player) {
      if (playing) {
        player.playVideo();
      } else {
        player.pauseVideo();
      }
    }
  }, [playing, player]);

  const opts: any = {
    height: 150,
    width: 220,
    playerVars: { // https://developers.google.com/youtube/player_parameters
      autoplay: 1
    }
  };
  return (
    <div style={{ position: "absolute", right: 15, bottom: 15, display: visible ? undefined : "none" }}>
      <Youtube
        onReady={(e) => setPlayer(e.target)}
        videoId={id}
        opts={opts}
        // onEnd={this.props.onEnd}
      />
    </div>
  );
}

