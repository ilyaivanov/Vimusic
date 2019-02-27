import {TreeNode} from "./types";

//1
//  1.1
//    1.1.1
//    1.1.2
//2
//3
//  3.1
//  3.2

export const createApp = (): TreeNode => ({
  ...createNodeEntry('1', ['1.1']),
  ...createNodeEntry('1.1', ['1.1.1', '1.1.2']),
  ...createNodeEntry('1.1.1'),
  ...createNodeEntry('1.1.2'),
  ...createNodeEntry('2'),
  ...createNodeEntry('3', ['3.1', '3.2']),
  ...createNodeEntry('3.1'),
  ...createNodeEntry('3.2'),
});


export const createNodeEntry = (key: string, children?: string[]) => ({
  [key]: {
    id: key,
    text: key,
    children
  }
});
