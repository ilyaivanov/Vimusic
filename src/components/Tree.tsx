import {AppState} from "../types";
import {List} from "./List";
import React from "react";

export default ({app}: { app: AppState }) => (
  <List
    nodes={app.nodes}
    nodesToShow={app.rootNodes}
    selectedId={app.selectedNode}
  />
);
