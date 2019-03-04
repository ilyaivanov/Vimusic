import {createState, simulateActionCreator} from "./testUtils";
import {AppState, TreeDefinition} from "../types";
import {swapSelectedNodeDown, swapSelectedNodeUp} from "./nodeSwap";

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


const getNode = (state: AppState, nodeId: string): TreeDefinition => {
  return state.nodes[nodeId];
};
