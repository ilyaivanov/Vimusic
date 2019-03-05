import React, { useEffect } from "react";
import SearchInput from "./Search/SearchInput";
import { SandboxContext } from "./SandboxContext";
import { useAppState } from "./state/reducer";
import { onKeyPress } from "./keyHandlers";
import Player from "./player";
import { AppState } from "./types";
import { isEditingCurrentNode } from "./state/treeUtils";
import Focusable from "./components/Focusable";
import Tree from "./components/Tree";
import { connect, Provider } from "react-redux";
import store from "./store";
import { playVideo } from "./player/actions";

const App = ({ playVideo }: any) => {
  const [searchNodes, searchDispatch] = useAppState();
  const [favoritesNodes, favoritesDispatch] = useAppState();

  const handlePlayerKeys = (event: KeyboardEvent, context: AppState) => {
    if (event.code === "KeyP" && !isEditingCurrentNode(context)) {
      const node = context.nodes[context.selectedNode];
      if (!node.youtubeId) {
        console.warn(node, "Expected to have 'youtubeId' property, but it didn't");
      } else {
        playVideo(node.youtubeId);
      }
    }
  };

  const onSearchKeyPressHandler = (event: KeyboardEvent) => {
    if (event.code === "KeyD" && !isEditingCurrentNode(searchNodes)) {
      favoritesDispatch({
        type: "CreateNode",
        placeBefore: favoritesNodes.rootNodes[0],
        props: {
          ...searchNodes.nodes[searchNodes.selectedNode],
          children: [],
          id: Math.random() + ""
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

  useEffect(() => {
    const saved = localStorage.getItem("favorites");
    if (saved) {
      favoritesDispatch({
        type: "RESTORE",
        savedState: JSON.parse(saved)
      });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favoritesNodes));
  }, [favoritesNodes]);

  return (
    <div>
      <div style={{ flexDirection: "row", display: "flex", alignItems: "stretch", height: "100vh" }}>
        <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
          <SearchInput onSearched={nodes => searchDispatch({ type: "SET_NODES", nodes })}/>
          <Focusable tabIndex={2} onKeyPress={onSearchKeyPressHandler}>
            <SandboxContext app={searchNodes} dispatch={searchDispatch}>
              <Tree app={searchNodes}/>
            </SandboxContext>
          </Focusable>
        </div>
        <Focusable tabIndex={3} onKeyPress={onFavoritesKeyPressHandler}>
          <SandboxContext app={favoritesNodes} dispatch={favoritesDispatch}>
            <div style={{ textAlign: "center" }}>Favorites</div>
            <Tree app={favoritesNodes}/>
          </SandboxContext>
        </Focusable>
      </div>
      <Player/>
    </div>
  );
};

const AppMapped = connect(null, { playVideo })(App);

export default () => (
  <Provider store={store}>
    <AppMapped/>
  </Provider>
);
