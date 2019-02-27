import {reducer} from './state';
import {AppState} from "./types";
import {createApp} from "./initialState";


const createState = (selected: string): AppState => ({
  selectedNode: selected,
  nodes: createApp(),
  rootNodes: ['1', '2', '3']
});

const moveUp = (state: AppState) =>
  reducer(state, {type: 'ArrowUp'});

const moveDown = (state: AppState) =>
  reducer(state, {type: 'ArrowDown'});

const verifyMoveDown = (initialPosition: string, expectedPosition: string) => {
  const state = createState(initialPosition);
  expect(moveDown(state).selectedNode).toEqual(expectedPosition);
};

const verifyMoveUp = (initialPosition: string, expectedPosition: string) => {
  const state = createState(initialPosition);
  expect(moveUp(state).selectedNode).toEqual(expectedPosition);
};


//1
//  1.1
//    1.1.1
//    1.1.2
//2
//3
//  3.1
//  3.2

describe('Having a default navigation tree state', () => {

  describe('when moving down', () => {
    test('from 1 should move to 1.1', () =>
      verifyMoveDown('1', '1.1'));

    test('from 1.1 should move to 1.1.1', () =>
      verifyMoveDown('1.1', '1.1.1'));

    test('from 1.1.1 should move to 1.1.2', () =>
      verifyMoveDown('1.1.1', '1.1.2'));

    test('from 1.1.2 should move to 2', () =>
      verifyMoveDown('1.1.2', '2'));

    test('from 2 should move to 3', () =>
      verifyMoveDown('2', '3'));

    test('from 3 should move to 3.1', () =>
      verifyMoveDown('3', '3.1'));

    test('from 3.1 should move to 3,2', () =>
      verifyMoveDown('3.1', '3.2'));

    test('from 3.2 should move to 3.2', () =>
      verifyMoveDown('3.2', '3.2'));
  });


  describe('when moving up', () => {
    test('from 1 should move to 1', () =>
      verifyMoveUp('1', '1'));

    test('from 1.1 should move to 1', () =>
      verifyMoveUp('1.1', '1'));

    test('from 1.1.1 should move to 1.1', () =>
      verifyMoveUp('1.1.1', '1.1'));

    test('from 1.1.2 should move to 1.1.1', () =>
      verifyMoveUp('1.1.2', '1.1.1'));

    test('from 2 should move to 1.1.2', () =>
      verifyMoveUp('2', '1.1.2'));

    test('from 3 should move to 2', () =>
      verifyMoveUp('3', '2'));

    test('from 3.1 should move to 3', () =>
      verifyMoveUp('3.1', '3'));

    test('from 3.2 should move to 3.1', () =>
      verifyMoveUp('3.2', '3.1'));
  });
});
