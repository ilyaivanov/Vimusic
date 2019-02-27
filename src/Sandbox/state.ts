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


const reducer = (state: AppState, action: Action): AppState => {
  if (action.type === 'ArrowDown')
    return {
      ...state,
      selectedNode: state.nodes[state.nodes.length - 1].id,
    };
  if (action.type === 'ArrowUp')
    return {
      ...state,
      selectedNode: state.nodes[0].id,
    };
  return state;
};


export const useAppState = () => {
  return useReducer(reducer, initial);
};

