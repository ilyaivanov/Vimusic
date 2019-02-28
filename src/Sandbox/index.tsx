import React, { useState } from "react";
import { useAppStateFromContext } from "../App";
import { contains } from "../utils/array";
import { useKeyboard } from "./hooks";
import { List } from "./List";
import { ActionType } from "./types";

export default () => {
  const [app, dispatch] = useAppStateFromContext();

  const [focus, setFocus] = useState(false);

  useKeyboard(
    event => {
      if (focus) {
        if (event.code === "F2") {
          dispatch({
            type: "EditNode",
            nodeId: app.selectedNode,
            props: { isEditing: true }
          });
        }
        if (
          contains(["Enter", "ArrowDown", "ArrowUp"], event.code) &&
          app.nodes[app.selectedNode].isEditing
        ) {
          dispatch({
            type: "EditNode",
            nodeId: app.selectedNode,
            props: { isEditing: false }
          });
        }
        dispatch({ type: event.code as ActionType });
      }
    },
    [focus, app]
  );

  return (
    <div
      tabIndex={2}
      onFocus={() => setFocus(true)}
      onBlur={() => setFocus(false)}
    >
      <List
        nodes={app.nodes}
        nodesToShow={app.rootNodes}
        selectedId={app.selectedNode}
      />
    </div>
  );
};
