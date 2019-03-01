import {reducer} from "./state";
import {AppState} from "./types";
import {createApp} from "./initialState";
import {isNodeHidden, updateNode} from "./treeUtils";

const createState = (selected: string): AppState => ({
  selectedNode: selected,
  nodes: createApp(),
  rootNodes: ["1", "2", "3"]
});

const moveUp = (state: AppState) => reducer(state, {type: "ArrowUp"});

const moveDown = (state: AppState) => reducer(state, {type: "ArrowDown"});

const moveRight = (state: AppState) => reducer(state, {type: "ArrowRight"});

const moveLeft = (state: AppState) => reducer(state, {type: "ArrowLeft"});

describe("Having a default navigation tree state", () => {
  describe("when moving right", () => {
    describe("on node 1.1", () => {
      it("node 1.1.1 should be selected (since node 1.1 has children)", () => {
        const state = createState("1.1");
        expect(moveRight(state).selectedNode).toEqual("1.1.1");
      });
    });

    describe("on node 1.1.1", () => {
      let newState: AppState;
      beforeEach(() => {
        const state = createState("1.1.1");
        newState = newState = moveRight(state);
      });

      it("node 1.1.1 should still be selected", () => {
        expect(newState.selectedNode).toEqual("1.1.1");
      });

      it("new nodes should be added", () => {
        expect(newState.nodes["1.1.1.1"].id).toEqual("1.1.1.1");
        expect(newState.nodes["1.1.1.2"].id).toEqual("1.1.1.2");
        expect(newState.nodes["1.1.1.3"].id).toEqual("1.1.1.3");
      });

      it("children of 1.1.1 should be updated", () => {
        expect(newState.nodes["1.1.1"].children).toEqual([
          "1.1.1.1",
          "1.1.1.2",
          "1.1.1.3"
        ]);
      });
    });
  });

  describe("when moving left", () => {
    it("on node 1.1.1 should select parent", () => {
      const state = createState("1.1.1");
      expect(moveLeft(state).selectedNode).toEqual("1.1");
    });

    it("on node 1 should hide node 1", () => {
      const state = moveLeft(createState("1"));
      expect(state.selectedNode).toEqual("1");
      expect(isNodeHidden(state, "1")).toEqual(true);
    });

    it("on node 3 should do nothing", () => {
      const state = createState("3");
      expect(moveLeft(state).selectedNode).toEqual("3");
    });
  });
});

describe("moving left from node 2", () => {
  it("should do nothing", () => {
    expect(moveLeft(createState("2")).selectedNode).toEqual("2");
  });
});

describe("Moving left from 1.1 node ", () => {
  let movedLeft: AppState;

  beforeEach(() => {
    movedLeft = moveLeft(createState("1.1"));
  });

  it("should hide children on that node", () => {
    expect(movedLeft.nodes["1.1"].isChildrenHidden).toEqual(true);
  });

  it("moving down should ignore hidden nodes and select 2", () => {
    expect(moveDown(movedLeft).selectedNode).toEqual("2");
  });

  describe("moving right", () => {
    it("moving right should show children on that node", () => {
      expect(moveRight(movedLeft).nodes["1.1"].isChildrenHidden).toEqual(false);
    });
  });

  describe("moving left again", () => {
    it("should select parent", () => {
      expect(moveLeft(movedLeft).selectedNode).toEqual("1");
    });
  });
});

describe("when node 1.1 is hidden and node 2 is selected", () => {
  it("moving up should select 1.1 node and not 1.1.2 node", () => {
    const state = updateNode(createState("2"), "1.1", {
      isChildrenHidden: true
    });
    expect(moveUp(state).selectedNode).toEqual("1.1");
  });
});

describe('creating a new node when 1.1 is selected', () => {
  it('should create two children', () => {
    const state = createState('1.1');
    const newState = reducer(state, {type: 'CreateNode', placeBefore: '1.1', props: {text: '1.2', id: '1.2'}});
    expect(newState.nodes['1.2'].text).toEqual('1.2');
    expect(newState.nodes['1'].children).toEqual(['1.2', '1.1']);
    expect(newState.selectedNode).toEqual('1.2');

  });
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
