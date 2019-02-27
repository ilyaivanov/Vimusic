import {reducer} from './state';
import {AppState, TreeNode} from "./types";

const createNode = (id: string, children?: TreeNode[]) => ({
  id,
  text: id,
  children
});

describe('Having three nodes each without children', () => {

  const treeNodes: TreeNode[] = [
    createNode('first'),
    createNode('second'),
    createNode('third'),
  ];

  describe('with first selected', () => {
    const state: AppState = {
      nodes: treeNodes,
      selectedNode: 'first'
    };

    it('when moving down second node should be selected', () => {
      expect(reducer(state, {type: 'ArrowDown'}).selectedNode).toEqual('second');
    });

    it('when moving up nothing should happen', () => {
      expect(reducer(state, {type: 'ArrowUp'}).selectedNode).toEqual('first');
    });
  });

  describe('when third is selected', () => {
    const state: AppState = {
      nodes: treeNodes,
      selectedNode: 'third'
    };

    it('when moving down nothing should happen', () => {
      expect(reducer(state, {type: 'ArrowDown'}).selectedNode).toEqual('third');
    });

    it('when moving up second should be selected', () => {
      expect(reducer(state, {type: 'ArrowUp'}).selectedNode).toEqual('second');
    });
  });

});
