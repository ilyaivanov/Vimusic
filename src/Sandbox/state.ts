import {Action, AppState} from "./types";
import {useReducer} from "react";

const initial: AppState = {
  nodes: [
    {
      id: 'sample',
      text: 'sample',
      children: [
        {
          id: 'sample child 1',
          text: 'sample child 1',
        },
        {
          id: 'sample child 2',
          text: 'sample child 2',
        }
      ]
    }, {
      id: 'another',
      text: 'another',
    },
    {
      id: 'third',
      text: 'third',
    },
  ],
  selectedNode: 'sample',
};


export const reducer = (state: AppState, action: Action): AppState => {
  if (action.type === 'ArrowDown') {
    const selectedNodeIndex = getSelectedIndex(state);
    if (selectedNodeIndex != state.nodes.length - 1) {
      return {
        ...state,
        selectedNode: state.nodes[selectedNodeIndex + 1].id,
      };
    }
  }
  if (action.type === 'ArrowUp') {
    const selectedNodeIndex = getSelectedIndex(state);
    if (selectedNodeIndex != 0) {
      return {
        ...state,
        selectedNode: state.nodes[selectedNodeIndex - 1].id,
      };
    }
  }
  return state;
};


export const useAppState = () => {
  return useReducer(reducer, initial);
};

const getSelectedIndex = (state: AppState) =>
  state.nodes.findIndex(n => n.id === state.selectedNode);
