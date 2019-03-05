import React, { useRef } from "react";
import { State } from "../types";
import { connect } from "react-redux";

interface OuterProps{
  level?: number;
  nodeId: string;
}

interface RowItemProps extends OuterProps{
  text: string;
  isSelected: boolean;
  isEditing: boolean;
  isChildrenHidden: boolean;
  isLoading: boolean;
}

const RowItemDef = ({ level, text, isSelected, isEditing, isChildrenHidden, isLoading }: RowItemProps) => {
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
      {isEditing ? (
        <input
          ref={txt1}
          type="text"
          value={text}
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
        text
      )}
      {isLoading && <i> (Loading...)</i>}
      {isChildrenHidden && "..."}
    </div>
  );
};

const mapState = (state: State, props: OuterProps) => ({
  text: state.favorites.nodes[props.nodeId].text,
  isEditing: false,
  isLoading: false,
  isChildrenHidden: false
});

export const RowItem = connect(mapState)(RowItemDef);
