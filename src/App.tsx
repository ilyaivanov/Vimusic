import React, { useEffect, useRef } from "react";
import SearchInput from "./Search/SearchInput";
import { onKeyPress } from "./tree/keyHandlers";
import Player from "./player";
import { State } from "./types";
import Tree from "./components/Tree";
import { connect, Provider } from "react-redux";
import store from "./store";
import { playVideo } from "./player/actions";
import { useKeyboard } from "./utils/hooks";

const App = ({ playVideo, favorites, search, handleFavoritesKeyPressed, scope }: any) => {

  const searchRef = useRef(null);
  const favoritesRef = useRef(null);

  useEffect(() => {
    if (favoritesRef && searchRef) {
      if (scope === "favorites") {
        // @ts-ignore
        favoritesRef.current.focus();
      } else if (scope === "search") {
        // @ts-ignore
        searchRef.current.focus();
      }
    }
  }, [searchRef, favoritesRef, scope]);

  useKeyboard(handleFavoritesKeyPressed);

  return (
    <div>
      <div style={{ flexDirection: "row", display: "flex", alignItems: "stretch", height: "100vh" }}>
        <div className="area" ref={searchRef} tabIndex={2}
             style={{ flex: 1, display: "flex", flexDirection: "column" }}>
          <SearchInput onSearched={nodes => console.log(nodes)}/>
          <Tree app={search}/>
        </div>
        <div className="area" ref={favoritesRef} tabIndex={3} style={{ flex: 2 }}>
          <div style={{ textAlign: "center" }}>Favorites</div>
          <Tree app={favorites}/>
        </div>
      </div>
      <Player/>
    </div>
  );
};

const mapState = (state: State) => ({
  favorites: state.favorites,
  search: state.search,
  scope: state.userSettings.selection
});

const handleFavoritesKeyPressed = (event: KeyboardEvent) => (dispatch: any, getState: () => State) => {
  onKeyPress(event, getState, dispatch);
};

const AppMapped = connect(mapState, { playVideo, handleFavoritesKeyPressed })(App);

export default () => (
  <Provider store={store}>
    <AppMapped/>
  </Provider>
);
