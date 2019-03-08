import React, { useEffect, useRef } from "react";
import { TreeDefinition } from "../types";
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
        display: "flex",
        alignItems: "center",
        marginTop: 4,
        marginBottom: 4,
        height: 30,
        paddingLeft: level ? level * 20 : undefined,
        backgroundColor: isSelected ? "#c3c3c3" : undefined
      }}
    >
      {
        <img
          style={{ paddingRight: 10 }}
          height={30}
          width={30}
          src={node.image || "https://cdn4.iconfinder.com/data/icons/categories-2/32/356-01-512.png"}
          alt="Image"/>
      }
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
