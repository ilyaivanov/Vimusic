import React from "react";
import Tree from "../components/Tree";
import {AppState} from "../Sandbox/types";

export default ({app}: { app: AppState }) => {
  return (
    <div>
      <div style={{textAlign: 'center'}}>Favorites</div>
      <Tree app={app}/>
    </div>
  );
};
