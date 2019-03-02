import React from "react";
import Search from "./Search";
import Favorites from "./Favorites";
import {SandboxContext} from "./SandboxContext";
import {useAppState} from "./Sandbox/state";
import {onKeyPress} from "./Sandbox/keyHandlers";
import YoutubePlayer from "./components/Player";
import {usePlayer} from "./state/player";
import {AppState} from "./Sandbox/types";
import {isEditingCurrentNode} from "./Sandbox/treeUtils";

const App = () => {
  const [searchNodes, searchDispatch] = useAppState();
  const [favoritesNodes, favoritesDispatch] = useAppState();

  const [playerState, dispatchPlayAction] = usePlayer();

  const handlePlayerKeys = (event: KeyboardEvent, context: AppState) => {
    if (event.code === 'KeyP' && !isEditingCurrentNode(context)) {
      const node = context.nodes[context.selectedNode];
      if (!node.youtubeId) {
        console.warn(node, "Expected to have 'youtubeId' property, but it didn't");
      } else {
        dispatchPlayAction({type: 'PLAY', youtubeVideoId: node.youtubeId})
      }
    }
  };

  const onSearchKeyPressHandler = (event: KeyboardEvent) => {
    if (event.code === 'KeyD' && !isEditingCurrentNode(searchNodes)) {
      favoritesDispatch({
        type: 'CreateNode',
        placeBefore: favoritesNodes.rootNodes[0],
        props: {
          ...searchNodes.nodes[searchNodes.selectedNode],
          children: [],
          id: Math.random() + '',
        }
      });
    }
    handlePlayerKeys(event, searchNodes);
    onKeyPress(event, searchNodes, searchDispatch);
  };

  const onFavoritesKeyPressHandler = (event: KeyboardEvent) => {
    handlePlayerKeys(event, favoritesNodes);
    onKeyPress(event, favoritesNodes, favoritesDispatch);
  };

  return (
    <div>
      <div style={{flexDirection: 'row', display: 'flex'}}>
        <div style={{flex: 1}}>
          <SandboxContext app={searchNodes} dispatch={searchDispatch}>
            <Search onTreeKeyPress={onSearchKeyPressHandler}/>
          </SandboxContext>
        </div>
        <div style={{flex: 1}}>
          <SandboxContext app={favoritesNodes} dispatch={favoritesDispatch}>
            <Favorites onTreeKeyPress={onFavoritesKeyPressHandler}/>
          </SandboxContext>
        </div>
      </div>
      <YoutubePlayer visible id={playerState.youtubeVideoId}/>

    </div>
  );
};


export default App;
