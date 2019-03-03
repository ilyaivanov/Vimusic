import {simulateKeyboardPress, simulateKeyboardPressForState} from "./testUtils";
import {createEmptyTree} from "../treeUtils";
import {AppState} from "../types";
import {reducer} from "../state";
import {dummyVideos} from "../../api/faked/youtube";
import {setVideosAsChildren} from "./traversal";

const verifyMoveDown = (initialPosition: string, expectedPosition: string) => {
  const state = simulateKeyboardPress(initialPosition, 'ArrowDown');
  expect(state.selectedNode).toEqual(expectedPosition);
};

const verifyMoveUp = (initialPosition: string, expectedPosition: string) => {
  const state = simulateKeyboardPress(initialPosition, 'ArrowUp');
  expect(state.selectedNode).toEqual(expectedPosition);
};

describe('having a 1.1.1 selected when moving right', () => {
  let state: AppState;
  beforeEach(() => {
    state = simulateKeyboardPress('1.1.1', 'ArrowRight');
  });

  it('1.1.1 should be marked as loading', () => {
    expect(state.nodes[state.selectedNode].isLoading).toEqual(true);
  });


  describe('when children have been loaded', () => {
    let withChildren: AppState;
    beforeEach(() => {
      withChildren = reducer(state, setVideosAsChildren(state.selectedNode, dummyVideos));
    });
    it('parent should have corresponding children', () => {
      expect(withChildren.nodes['1.1.1'].children).toHaveLength(3);
    });

    it('children should have their own definitions', () => {
      const parent = withChildren.nodes['1.1.1'] as any;
      const parentId = parent.children[0];
      expect(withChildren.nodes[parentId].text).toBeDefined();
    });
  });
});


describe("when moving up", () => {
  test("from 1 should move to 1", () =>
    verifyMoveUp("1", "1"));

  test("from 1.1 should move to 1", () =>
    verifyMoveUp("1.1", "1"));

  test("from 1.1.1 should move to 1.1", () =>
    verifyMoveUp("1.1.1", "1.1"));

  test("from 1.1.2 should move to 1.1.1", () =>
    verifyMoveUp("1.1.2", "1.1.1"));

  test("from 2 should move to 1.1.2", () =>
    verifyMoveUp("2", "1.1.3"));

  test("from 3 should move to 2", () =>
    verifyMoveUp("3", "2"));

  test("from 3.1 should move to 3", () =>
    verifyMoveUp("3.1", "3"));

  test("from 3.2 should move to 3.1", () =>
    verifyMoveUp("3.2", "3.1"));
});

describe("when moving down", () => {
  test("from 1 should move to 1.1", () =>
    verifyMoveDown("1", "1.1"));

  test("from 1.1 should move to 1.1.1", () =>
    verifyMoveDown("1.1", "1.1.1"));

  test("from 1.1.1 should move to 1.1.2", () =>
    verifyMoveDown("1.1.1", "1.1.2"));

  test("from 1.1.3 should move to 2", () =>
    verifyMoveDown("1.1.3", "2"));

  test("from 2 should move to 3", () =>
    verifyMoveDown("2", "3"));

  test("from 3 should move to 3.1", () =>
    verifyMoveDown("3", "3.1"));

  test("from 3.1 should move to 3,2", () =>
    verifyMoveDown("3.1", "3.2"));

  test("from 3.2 should move to 3.2", () =>
    verifyMoveDown("3.2", "3.2"));
});

describe('having an empty tree', () => {
  it('when moving down nothing should happen', () => {
    const state = simulateKeyboardPressForState(createEmptyTree(), 'ArrowDown');
    expect(state).toEqual(createEmptyTree());
  });
});
