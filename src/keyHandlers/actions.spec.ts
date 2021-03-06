import {AppState} from "../types";
import {simulateKeyboardPress, simulateKeyboardPressForState, simulateSequenceOfEvents} from "./testUtils";
import {createEmptyTree} from "../state/treeUtils";

describe('creating a new node when 1 is selected', () => {
  let state: AppState;

  beforeEach(() => {
    state = simulateKeyboardPress('1', 'Enter');
  });
  it('should create a new node before 1st', () => {
    expect(state.rootNodes).toHaveLength(4);
  });

  it('it should be in editing state', () => {
    const newNodeId = state.rootNodes[0];
    expect(state.nodes[newNodeId].isEditing).toEqual(true);
  });

  it('second root node should be 1', () => {
    const secondNodeId = state.rootNodes[1];
    expect(state.nodes[secondNodeId].text).toEqual('1');
  });

  it('then when moving down nothing should happen', () => {
    const s = simulateKeyboardPressForState(state, 'ArrowDown');
    expect(s).toEqual(state);
  });
});

describe('having an empty state', () => {
  describe('when creating a new node', () => {
    it('a single new node should be created in that tree', () => {
      const state = simulateKeyboardPressForState(createEmptyTree(), 'Enter');
      expect(state.rootNodes).toHaveLength(1);
    });
  });
});

describe('having a single node', () => {
  it('when removing that node we should get an empty state', () => {
    const state = simulateSequenceOfEvents(createEmptyTree(), ['Enter', 'Enter', 'Backspace']);
    expect(state).toEqual(createEmptyTree());
  });
});
