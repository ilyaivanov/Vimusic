import {createState, simulateActionCreator} from "./testUtils";
import {AppState, TreeDefinition} from "../../types";
import {swapSelectedNodeDown, swapSelectedNodeLeft, swapSelectedNodeRight, swapSelectedNodeUp} from "./nodeSwap";

it('swapping node 1.1.1 down should swap 1.1.1 and 1.1.2 nodes', () => {
  const state = simulateActionCreator(createState('1.1.1'), swapSelectedNodeDown);
  expect(getNode(state, '1.1').children).toEqual(['1.1.2', '1.1.1', '1.1.3']);
  expect(state.selectedNode).toEqual('1.1.1');
});

it('swapping node 1.1.2 up should swap 1.1.1 and 1.1.2 nodes', () => {
  const state = simulateActionCreator(createState('1.1.2'), swapSelectedNodeUp);
  expect(getNode(state, '1.1').children).toEqual(['1.1.2', '1.1.1', '1.1.3']);
  expect(state.selectedNode).toEqual('1.1.2');
});


it('swapping root node 2 up should switch root nodes', () => {
  const state = simulateActionCreator(createState('2'), swapSelectedNodeUp);
  expect(state.rootNodes).toEqual(['2', '1', '3']);
  expect(state.selectedNode).toEqual('2');
});


it('swapping root node 2 down should switch root nodes', () => {
  const state = simulateActionCreator(createState('2'), swapSelectedNodeDown);
  expect(state.rootNodes).toEqual(['1', '3', '2']);
  expect(state.selectedNode).toEqual('2');
});

describe('swapping node 1.1.2 to the right', () => {
  let state: AppState;
  beforeEach(() => {
    state = simulateActionCreator(createState('1.1.2'), swapSelectedNodeRight);
  });

  it('should assign it as child of 1.1.1 node', () => {
    expect(state.nodes['1.1.1'].children).toEqual(['1.1.2']);
  });

  it('should remove 1.1.2 as children of 1.1 node', () => {
    expect(state.nodes['1.1'].children).toEqual(['1.1.1', '1.1.3']);
  });
});


describe('swapping node 1.1.1 to the left', () => {
  let state: AppState;
  beforeEach(() => {
    state = simulateActionCreator(createState('1.1.1'), swapSelectedNodeLeft);
  });

  it('should assign it as child of 1 node', () => {
    expect(state.nodes['1'].children).toEqual(['1.1', '1.1.1']);
  });

  it('should remove 1.1.1 as children of 1.1 node', () => {
    expect(state.nodes['1.1'].children).toEqual(['1.1.2', '1.1.3']);
  });
});

describe('swapping node 1.1 to the left', () => {
  let state: AppState;
  beforeEach(() => {
    state = simulateActionCreator(createState('1.1'), swapSelectedNodeLeft);
  });

  it('should assign 1.1 to roots', () => {
    expect(state.rootNodes).toEqual(['1', '1.1', '2', '3']);
  });

  it('should remove 1.1 as children of 1 node', () => {
    expect(state.nodes['1'].children).toEqual([]);
  });
});

describe('swapping node 2 to the right', () => {
  let state: AppState;
  beforeEach(() => {
    state = simulateActionCreator(createState('2'), swapSelectedNodeRight);
  });

  it('should append it to subchild to 1 node to roots', () => {
    expect(state.nodes['1'].children).toEqual(['1.1', '2',]);
  });

  it('should remove 2 from roots', () => {
    expect(state.rootNodes).toEqual(['1', '3']);
  });

});


it('swapping node 1.1.1 to the right should do nothing', () => {
  const state = simulateActionCreator(createState('1.1.1'), swapSelectedNodeRight);
  expect(state).toEqual(createState('1.1.1'));
});


const getNode = (state: AppState, nodeId: string): TreeDefinition => {
  return state.nodes[nodeId];
};
