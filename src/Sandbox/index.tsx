import React, {useEffect} from "react";
import {List} from "./List";
import {ActionType} from "./types";
import {useAppState} from "./state";

export default () => {
  const [app, dispatch] = useAppState();
  useKeyboard(event => {
    dispatch({type: event.code as ActionType});
  });
  return <List nodes={app.nodes} nodeToShow={app.rootNodes} selectedId={app.selectedNode}/>
}


//Hooks
const useKeyboard = (handleEvent: (event: DocumentEventMap['keydown']) => void) => {
  return useEffect(() => {
    window.document.addEventListener('keydown', handleEvent);
    return () => {
      window.document.removeEventListener('keydown', handleEvent);
    };
  }, []);
};

