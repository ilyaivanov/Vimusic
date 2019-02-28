import React, { Fragment, useRef, useEffect } from "react";
import { TreeNode } from "./types";
import { useAppStateFromContext } from "../App";

interface Props {
  nodes: TreeNode;
  nodesToShow: string[];
  selectedId: string;
  level?: number;
}

export const List = ({ nodes, selectedId, nodesToShow, level = 0 }: Props) => (
  <Fragment>
    {nodesToShow.map(n => (
      <Fragment key={n}>
        <RowItem nodeId={n} level={level} />
        {nodes[n].children && !nodes[n].isChildrenHidden && (
          <List
            nodes={nodes}
            nodesToShow={nodes[n].children as string[]}
            selectedId={selectedId}
            level={level + 1}
          />
        )}
      </Fragment>
    ))}
  </Fragment>
);

interface RowItemProps {
  level?: number;
  nodeId: string;
}

const RowItem = ({ level, nodeId }: RowItemProps) => {
  const [app, dispatch] = useAppStateFromContext();

  const node = app.nodes[nodeId];
  const isSelected = app.selectedNode === nodeId;

  const txt1 = useRef(null);

  useEffect(() => {
    const { current } = txt1 as any;
    if (current && node.isEditing) {
      current.focus();
    }
  }, [node.isEditing]);

  return (
    <div
      style={{
        fontWeight: isSelected ? 600 : undefined,
        paddingLeft: level ? level * 20 : undefined,
        backgroundColor: isSelected ? "#c3c3c3" : undefined
      }}
    >
      {node.isEditing ? (
        <input
          ref={txt1}
          type="text"
          value={node.text}
          onBlur={() =>
            dispatch({
              type: "EditNode",
              nodeId: nodeId,
              props: { isEditing: false }
            })
          }
          onChange={e =>
            dispatch({
              type: "EditNode",
              nodeId: nodeId,
              props: { text: e.target.value }
            })
          }
        />
      ) : (
        node.text
      )}
      {node.isChildrenHidden ? "..." : ""}
    </div>
  );
};
