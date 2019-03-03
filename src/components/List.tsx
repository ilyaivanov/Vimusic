import React, {Fragment} from "react";
import {TreeNode} from "../types";
import {RowItem} from "./RowItem";

interface Props {
  nodes: TreeNode;
  nodesToShow: string[];
  selectedId: string;
  level?: number;
}

export const List = ({nodes, selectedId, nodesToShow, level = 0}: Props) => (
  <Fragment>
    {nodesToShow.map(n => (
      <Fragment key={n}>
        <RowItem nodeId={n} level={level}/>
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

