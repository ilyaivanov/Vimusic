import {Action, AppState, TreeDefinition, TreeNode} from "../types";
import {reducer} from "../state";
import {onKeyPress} from "./index";

const createState = (selected: string): AppState => ({
  selectedNode: selected,
  nodes: createTestInitialTree(),
  rootNodes: ["1", "2", "3"]
});


export const simulateKeyboardPress = (initialPosition: string, code: string) => {
  let state = createState(initialPosition);
  const dummyDispatch = (action: Action) => {
    state = reducer(state, action);
  };
  onKeyPress({code} as KeyboardEvent, state, dummyDispatch);
  return state;
};


export const simulateKeyboardPressForState = (state: AppState, code: string) => {
  let result = state;
  const dummyDispatch = (action: Action) => {
    result = reducer(result, action);
  };
  onKeyPress({code} as KeyboardEvent, result, dummyDispatch);
  return result;
};

export const simulateSequenceOfEvents = (state: AppState, codes: string[]) =>
  codes.reduce((currentState, code) => simulateKeyboardPressForState(currentState, code), state);


//1
//  1.1
//    1.1.1
//    1.1.2
//    1.1.3
//2
//3
//  3.1
//  3.2

export const createTestInitialTree = (): TreeNode => ({
  ...createNodeEntry("1", {children: ["1.1"]}),
  ...createNodeEntry("1.1", {children: ["1.1.1", "1.1.2", '1.1.3']}),
  ...createNodeEntry("1.1.1"),
  ...createNodeEntry("1.1.2"),
  ...createNodeEntry("1.1.3"),
  ...createNodeEntry("2"),
  ...createNodeEntry("3", {children: ["3.1", "3.2"]}),
  ...createNodeEntry("3.1"),
  ...createNodeEntry("3.2")
});

export const createNodeEntry = (
  key: string,
  props?: Partial<TreeDefinition>
) => ({
  [key]: {
    text: key,
    ...props,
    id: key
  }
});
