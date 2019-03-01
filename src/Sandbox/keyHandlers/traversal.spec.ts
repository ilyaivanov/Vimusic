import {Action, AppState} from "../types";
import {reducer} from "../state";
import {createApp} from "../initialState";
import {onKeyPress} from "./index";

const createState = (selected: string): AppState => ({
  selectedNode: selected,
  nodes: createApp(),
  rootNodes: ["1", "2", "3"]
});


const simulateKeyboardPress = (initialPosition: string, code: string) => {
  let state = createState(initialPosition);
  const dummyDispatch = (action: Action) => {
    state = reducer(state, action);
  };
  onKeyPress({code} as KeyboardEvent, state, dummyDispatch);
  return state;
};

const verifyMoveDown = (initialPosition: string, expectedPosition: string) => {
  const state = simulateKeyboardPress(initialPosition, 'ArrowDown');
  expect(state.selectedNode).toEqual(expectedPosition);
};

const verifyMoveUp = (initialPosition: string, expectedPosition: string) => {
  const state = simulateKeyboardPress(initialPosition, 'ArrowUp');
  expect(state.selectedNode).toEqual(expectedPosition);
};


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
