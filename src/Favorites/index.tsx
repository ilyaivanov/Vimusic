import React from "react";
import Focusable from "../components/Focusable";
import {useAppStateFromContext} from "../SandboxContext";
import Tree from "../components/Tree";

export default ({onTreeKeyPress}: any) => {
  const [app] = useAppStateFromContext();

  return (
    <div>
      <div style={{textAlign: 'center'}}>Favorites</div>
      <Focusable tabIndex={3} onKeyPress={onTreeKeyPress}>
        <Tree app={app}/>
      </Focusable>
    </div>
  );
};
