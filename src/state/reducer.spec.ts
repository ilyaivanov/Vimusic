import {reducer} from "./reducer";
import {AppState} from "../types";
import {createTestInitialTree} from "../keyHandlers/testUtils";

const createState = (selected: string): AppState => ({
  selectedNode: selected,
  nodes: createTestInitialTree(),
  rootNodes: ["1", "2", "3"]
});


describe('deleting a node 1.1 ', () => {
  let state: AppState;
  beforeEach(() => {
    state = reducer(createState('1.1'), {type: 'Delete', nodeId: '1.1'});
  });

  it('should remove that node', () => {
    expect(state.nodes['1.1']).toBeUndefined();
  });

  it('should remove if from the parent', () => {
    expect(state.nodes['1'].children).toEqual([]);
  });

  it('should select node 1', () => {
    expect(state.selectedNode).toEqual('1');
  });

  it('should remove all children', () => {
    expect(state.nodes['1.1.1']).toBeUndefined();
    expect(state.nodes['1.1.2']).toBeUndefined();
    expect(state.nodes['1.1.3']).toBeUndefined();
  });

});

it('deleting a node 1.1.1 should select node 1.1.2 (next if deleting first)', () => {
  const state = reducer(createState('1.1.1'), {type: 'Delete', nodeId: '1.1.1'});
  expect(state.selectedNode).toEqual('1.1.2');
});

it('deleting a node 1.1.2 should select node 1.1.1 (previous if exist)', () => {
  const state = reducer(createState('1.1.2'), {type: 'Delete', nodeId: '1.1.2'});
  expect(state.selectedNode).toEqual('1.1.1');
});

it('deleting a node 1.1.3 should select node 1.1.2 (previous if exist)', () => {
  const state = reducer(createState('1.1.3'), {type: 'Delete', nodeId: '1.1.3'});
  expect(state.selectedNode).toEqual('1.1.2');
});

describe('deleting a node 1', () => {
  it('should remove all of the subchilds (including 1.1.1)', () => {
    const state = reducer(createState('1'), {type: 'Delete', nodeId: '1'});
    expect(state.nodes['1.1.1']).toBeUndefined();
  });

  it('should select 2', () => {
    const state = reducer(createState('1'), {type: 'Delete', nodeId: '1'});
    expect(state.selectedNode).toEqual('2');
  });

  it('should remove it from the root nodes', () => {
    const state = reducer(createState('1'), {type: 'Delete', nodeId: '1'});
    expect(state.rootNodes).toEqual(['2', '3']);
  });
});

describe('deleting a node 3', () => {
  it('should remove all of the subchilds (including 1.1.1)', () => {
    const state = reducer(createState('3'), {type: 'Delete', nodeId: '3'});
    expect(state.rootNodes).toEqual(['1', '2']);
  });
});


describe('creating a new node before 1', () => {
  it('should create node before 1', () => {
    const state = reducer(createState('1'), {
      type: "CreateNode",
      placeBefore: '1',
      props: {text: 'New Node', isEditing: true, id: 'myid'}
    });

    expect(state.rootNodes).toEqual(['myid', '1', '2', '3']);
  });
});
