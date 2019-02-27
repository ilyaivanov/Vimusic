import React, {useEffect, useState} from "react";
import {List} from "./List";
import {Action, ActionType, AppState} from "./types";

type Dispatch = (action: Action) => void;

export default ({app, dispatch}: { app: AppState, dispatch: Dispatch }) => {
  const [focus, setFocus] = useState(false);

  useKeyboard(event => {
    if (focus) {
      dispatch({type: event.code as ActionType});
    }
  }, [focus]);

  return <div tabIndex={2} onFocus={() => setFocus(true)} onBlur={() => setFocus(false)}>
    <List nodes={app.nodes} nodeToShow={app.rootNodes} selectedId={app.selectedNode}/>
  </div>;
}


//Hooks
const useKeyboard = (handleEvent: (event: DocumentEventMap['keydown']) => void, deps: {}[]) => {
  return useEffect(() => {
    window.document.addEventListener('keydown', handleEvent);
    return () => {
      window.document.removeEventListener('keydown', handleEvent);
    };
  }, deps);
};
