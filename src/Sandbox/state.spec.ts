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

const moveRight = (state: AppState) =>
  reducer(state, {type: 'ArrowRight'});

const moveLeft = (state: AppState) =>
  reducer(state, {type: 'ArrowLeft'});

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

  describe('when moving right', () => {
    describe('on node 1.1', () => {
      it('node 1.1.1 should be selected (since node 1.1 has children)', () => {
        const state = createState('1.1');
        expect(moveRight(state).selectedNode).toEqual('1.1.1');
      });
    });

    describe('on node 1.1.1', () => {
      let newState: AppState;
      beforeEach(() => {
        const state = createState('1.1.1');
        newState = newState = moveRight(state);
      });

      it('node 1.1.1 should still be selected', () => {
        expect(newState.selectedNode).toEqual('1.1.1');
      });

      it('new nodes should be added', () => {
        expect(newState.nodes['1.1.1.1'].id).toEqual('1.1.1.1');
        expect(newState.nodes['1.1.1.2'].id).toEqual('1.1.1.2');
        expect(newState.nodes['1.1.1.3'].id).toEqual('1.1.1.3');
      });

      it('children of 1.1.1 should be updated', () => {
        expect(newState.nodes['1.1.1'].children).toEqual(['1.1.1.1', '1.1.1.2', '1.1.1.3']);
      });
    });
  });


  describe('when moving left', () => {
    it('on node 1.1.1 should select parent', () => {
      const state = createState('1.1.1');
      expect(moveLeft(state).selectedNode).toEqual('1.1');
    });

    it('on node 1 should do nothing', () => {
      const state = createState('1');
      expect(moveLeft(state).selectedNode).toEqual('1');
    });

    it('on node 3 should do nothing', () => {
      const state = createState('3');
      expect(moveLeft(state).selectedNode).toEqual('3');
    });
  });

});
