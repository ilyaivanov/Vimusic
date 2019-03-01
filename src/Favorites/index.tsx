import React from "react";
import Focusable from "../components/Focusable";
import {onKeyPress} from "../Sandbox/keyHandlers";
import {useAppStateFromContext} from "../SandboxContext";
import Tree from "../components/Tree";

export default () => {
  const [app, dispatch] = useAppStateFromContext();

  return (
    <div>
      <div style={{textAlign: 'center'}}>Favorites</div>
      <Focusable tabIndex={3} onKeyPress={event => onKeyPress(event, app, dispatch)}>
        <Tree app={app}/>
      </Focusable>
    </div>
  );
};
