import React, { useEffect, useRef } from "react";
import { State, TreeDefinition } from "../types";
import { editAction } from "../tree/keyHandlers/actions";
import { connect } from "react-redux";

interface OuterProps {
  level: number;
  isSelected: boolean
  node: TreeDefinition;
  editAction: typeof editAction;
}

const RowItem = ({ level, node, isSelected, editAction }: OuterProps) => {
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
          tabIndex={4}
          onBlur={() => editAction(node.id, { isEditing: false })}
          onChange={e => editAction(node.id, { text: e.target.value })}
        />
      ) : (
        node.text
      )}
      {node.isLoading && <i> (Loading...)</i>}
      {node.isChildrenHidden && "..."}
    </div>
  );
};

export default connect(null, { editAction })(RowItem);
