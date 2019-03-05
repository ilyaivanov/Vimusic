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

const App = ({ playVideo, favorites, search, handleFavoritesKeyPressed, select, scope }: any) => {

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

  useKeyboard(handleFavoritesKeyPressed);

  return (
    <div>
      <div style={{ flexDirection: "row", display: "flex", alignItems: "stretch", height: "100vh" }}>
        <div className="area" ref={searchRef} tabIndex={2}
             onFocus={() => select('search')}
             style={{ flex: 1, display: "flex", flexDirection: "column" }}>
          <SearchInput onSearched={nodes => console.log(nodes)}/>
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

const handleFavoritesKeyPressed = (event: KeyboardEvent) => (dispatch: any, getState: () => State) => {
  const dispatcher = (a: any) => dispatch({ ...a, selection: getState().userSettings.selection });
  onKeyPress(event, getState, dispatcher);
};



const AppMapped = connect(mapState, { playVideo, select, handleFavoritesKeyPressed })(App);

export default () => (
  <Provider store={store}>
    <AppMapped/>
  </Provider>
);
