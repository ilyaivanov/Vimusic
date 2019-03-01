import * as React from 'react';

import Youtube from 'react-youtube';

interface Props {
  visible: boolean;
  id?: string;
}

export default ({visible, id}: Props) => {
  if (!id)
    return null;

  const opts: any = {
    height: 150,
    width: 220,
    playerVars: { // https://developers.google.com/youtube/player_parameters
      autoplay: 1
    }
  };
  return (
    <div style={{position: 'absolute', right: 15, bottom: 15, display: visible ? undefined : 'none'}}>
      <Youtube
        videoId={id}
        opts={opts}
        // onEnd={this.props.onEnd}
        // onReady={(e: any) => this.props.onReady(e.target)}
      />
    </div>
  );
}
