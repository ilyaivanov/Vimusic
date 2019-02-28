import React, { useContext, useEffect, useState } from "react";
import { searchVideos, Video } from "./api";
import Sandbox from "./Sandbox";
import { useAppState } from "./Sandbox/state";
import { useDebounce } from "./Sandbox/hooks";
import { AppState, Dispatch } from "./Sandbox/types";

const App = () => {
  const [text, setText] = useState("");
  const value = useDebounce(text, 500);
  const [isSearching, setIsSearching] = useState(false);
  const [artists, setArtists] = useState([] as Video[]);
  const [app, dispatch] = useAppState();

  useEffect(() => {
    if (value) {
      setIsSearching(true);
      searchVideos(value).then(videos => {
        setIsSearching(false);
        dispatch({ type: "SET_NODES", videos });
      });
    }
  }, [value]);

  return (
    <div>
      <input
        tabIndex={1}
        value={text}
        onChange={e => setText(e.target.value)}
        type="text"
        style={{ width: 300 }}
      />
      {isSearching ? "Searching..." : " "}
      {artists.map(a => (
        <div key={a.id}>{a.text}</div>
      ))}
      <CountProvider app={app} dispatch={dispatch}>
        <Sandbox />
      </CountProvider>
    </div>
  );
};

// @ts-ignore
const CountContext = React.createContext();

const CountProvider = ({ children, app, dispatch }: any) => {
  return (
    <CountContext.Provider value={[app, dispatch]}>
      {children}
    </CountContext.Provider>
  );
};

export const useAppStateFromContext = (): [AppState, Dispatch] => {
  const contextValue = useContext(CountContext);
  return contextValue as [AppState, Dispatch];
};

export default App;
