import React from "react";
import Search from "./Search";
import Favorites from "./Favorites";
import {SandboxContext} from "./SandboxContext";
import {useAppState} from "./Sandbox/state";
import {onKeyPress} from "./Sandbox/keyHandlers";

const App = () => {
  const [searchNodes, searchDispatch] = useAppState();
  const [favoritesNodes, favoritesDispatch] = useAppState();

  const onKeyPressHandler = (event: KeyboardEvent) => {
    if (event.code === 'KeyD') {
      favoritesDispatch({
        type: 'CreateNode',
        placeBefore: favoritesNodes.rootNodes[0],
        props: {
          id: Math.random() + '',
          text: searchNodes.nodes[searchNodes.selectedNode].text
        }
      });
    } else
      onKeyPress(event, searchNodes, searchDispatch);
  };


  return (
    <div style={{flexDirection: 'row', display: 'flex'}}>
      <div style={{flex: 1}}>
        <SandboxContext app={searchNodes} dispatch={searchDispatch}>
          <Search onTreeKeyPress={onKeyPressHandler}/>
        </SandboxContext>
      </div>
      <div style={{flex: 1}}>
        <SandboxContext app={favoritesNodes} dispatch={favoritesDispatch}>
          <Favorites/>
        </SandboxContext>
      </div>
    </div>
  );
};


export default App;
