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
import { select } from "./userSettings/actions";
import { setNodes } from "./tree/keyHandlers/actions";

const App = ({ playVideo, favorites, search, onKeyPress, select, scope, setNodes }: any) => {

  const searchRef = useRef(null);
  const favoritesRef = useRef(null);

  useEffect(() => {
    if (favoritesRef && searchRef) {
      if (scope === "favorites") {
        console.log('setting focus to favorites');
        // @ts-ignore
        favoritesRef.current.focus();
      } else if (scope === "search") {
        console.log('setting focus to search');
        // @ts-ignore
        searchRef.current.focus();
      }
    }
  }, [searchRef, favoritesRef, scope]);

  useKeyboard(onKeyPress);

  return (
    <div>
      <div style={{ flexDirection: "row", display: "flex", alignItems: "stretch", height: "100vh" }}>
        <div className="area" ref={searchRef} tabIndex={2}
             onFocus={() => select('search')}
             style={{ flex: 1, display: "flex", flexDirection: "column" }}>
          <SearchInput onSearched={setNodes}/>
          <Tree app={search}/>
        </div>
        <div className="area" ref={favoritesRef} onFocus={() => select('favorites')} tabIndex={3} style={{ flex: 2 }}>
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

const AppMapped = connect(mapState, { playVideo, select, onKeyPress, setNodes })(App);

export default () => (
  <Provider store={store}>
    <AppMapped/>
  </Provider>
);
