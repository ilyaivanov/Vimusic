import React, {Fragment, useEffect, useReducer} from 'react';

const App = () => {
  const [app, dispatch] = useAppState();
  useKeyboard(event => {
    dispatch({type: event.code as ActionType});
  });
  return <List nodes={app.nodes} selectedId={app.selectedNode}/>
};

const List = ({nodes, selectedId, level = 0}: { nodes: Node[], selectedId: string, level?: number }) => (
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

export default App;


//Hooks
const useKeyboard = (handleEvent: (event: DocumentEventMap['keydown']) => void) => {
  return useEffect(() => {
    window.document.addEventListener('keydown', handleEvent);
    return () => {
      window.document.removeEventListener('keydown', handleEvent);
    };
  }, []);
};

type ActionType = 'ArrowDown' | 'ArrowUp';

interface Action {
  type: ActionType;
}

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

const useAppState = () => {
  return useReducer(reducer, initial);
};

interface AppState {
  nodes: Node[];
  selectedNode: string;
}

interface Node {
  id: string;
  children?: Node[];
  text: string;
}

