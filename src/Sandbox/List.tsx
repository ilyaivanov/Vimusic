import React, {Fragment} from "react";
import {TreeNode} from "./types";

interface Props {
  nodes: TreeNode,
  nodeToShow: string[],
  selectedId: string,
  level?: number
}

export const List = ({nodes, selectedId, nodeToShow, level = 0}: Props) => (
  <Fragment>
    {
      nodeToShow.map(n => (
        <Fragment key={n}>
          <RowItem isSelected={selectedId === n} text={nodes[n].text} level={level}/>
          {nodes[n].children &&
          <List nodes={nodes} nodeToShow={nodes[n].children as string[]} selectedId={selectedId} level={level + 1}/>}
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
