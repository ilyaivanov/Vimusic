import React, { useRef } from "react";
import { TreeDefinition } from "../types";

interface OuterProps {
  level: number;
  isSelected: boolean
  node: TreeDefinition;
}


const RowItem = ({ level, node, isSelected }: OuterProps) => {
  const txt1 = useRef(null);

  // useEffect(() => {
  //   const {current} = txt1 as any;
  //   if (current && node.isEditing) {
  //     current.focus();
  //   }
  // }, [node.isEditing]);

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
          // onBlur={() =>
          //   dispatch({
          //     type: "EditNode",
          //     nodeId: nodeId,
          //     props: {isEditing: false}
          //   })
          // }
          // onChange={e =>
          //   dispatch({
          //     type: "EditNode",
          //     nodeId: nodeId,
          //     props: {text: e.target.value}
          //   })
          // }
        />
      ) : (
        node.text
      )}
      {node.isLoading && <i> (Loading...)</i>}
      {node.isChildrenHidden && "..."}
    </div>
  );
};

export default RowItem;
