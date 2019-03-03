import React, {useContext} from "react";
import {AppState, Dispatch} from "./types";

// @ts-ignore
const CountContext = React.createContext();

export const SandboxContext = ({children, app, dispatch}: any) => {
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
