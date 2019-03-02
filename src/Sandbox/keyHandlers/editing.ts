// import {contains} from "../../utils/array";
// import {ActionType} from "../types";
//
// if (focus) {
//   if (event.code === "F2") {
//     dispatch({
//       type: "EditNode",
//       nodeId: app.selectedNode,
//       props: {isEditing: true}
//     });
//   }
//   if (
//     contains(["Enter", "ArrowDown", "ArrowUp"], event.code) &&
//     app.nodes[app.selectedNode].isEditing
//   ) {
//     dispatch({
//       type: "EditNode",
//       nodeId: app.selectedNode,
//       props: {isEditing: false}
//     });
//   } else if (event.code === 'Enter') {
//     dispatch({
//       type: "CreateNode",
//       placeBefore: app.selectedNode,
//       props: {text: 'New Node', isEditing: true}
//     });
//   } else if (event.code === 'Backspace') {
//     dispatch({
//       type: "Delete",
//       nodeId: app.selectedNode
//     });
//   }
//   dispatch({type: event.code as ActionType});
// }

import {AppStateActionCreator} from "../types";

export const createNode: AppStateActionCreator = (state, dispatch) => {
  dispatch({
    type: "CreateNode",
    placeBefore: state.selectedNode,
    props: {text: 'New Node', isEditing: true}
  });
};

export const startEditNode: AppStateActionCreator = (state, dispatch) => {
  dispatch({
    type: "EditNode",
    nodeId: state.selectedNode,
    props: {isEditing: true}
  });
};

export const stopEditNode: AppStateActionCreator = (state, dispatch) => {
  dispatch({
    type: "EditNode",
    nodeId: state.selectedNode,
    props: {isEditing: false}
  });
};

export const deleteNode: AppStateActionCreator = (state, dispatch) => {
  dispatch({
    type: "Delete",
    nodeId: state.selectedNode
  });
};
