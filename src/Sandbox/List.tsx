import React, {Fragment} from "react";
import {TreeNode} from "./types";

interface Props {
  nodes: TreeNode[],
  selectedId: string,
  level?: number
}

export const List = ({nodes, selectedId, level = 0}: Props) => (
  <Fragment>
    {
      nodes.map(n => (
        <Fragment key={n.id}>
          <RowItem isSelected={selectedId === n.id} text={n.text} level={level}/>
          {n.children && <List nodes={n.children} selectedId={selectedId} level={level + 1}/>}
        </Fragment>
      ))
    }
  </Fragment>
);

interface RowItemProps {
  level?: number;
  isSelected?: boolean;
  text: string;
}

const RowItem = ({level, isSelected, text}: RowItemProps) => (
  <div style={{
    fontWeight: isSelected ? 600 : undefined,
    paddingLeft: level ? level * 20 : undefined,
    backgroundColor: isSelected ? '#c3c3c3' : undefined
  }}>{text}</div>
);
