import { TreeDefinition, TreeNode } from "./types";

//1
//  1.1
//    1.1.1
//    1.1.2
//2
//3
//  3.1
//  3.2

export const createApp = (): TreeNode => ({
  ...createNodeEntry("1", { children: ["1.1"] }),
  ...createNodeEntry("1.1", { children: ["1.1.1", "1.1.2"] }),
  ...createNodeEntry("1.1.1"),
  ...createNodeEntry("1.1.2"),
  ...createNodeEntry("2"),
  ...createNodeEntry("3", { children: ["3.1", "3.2"] }),
  ...createNodeEntry("3.1"),
  ...createNodeEntry("3.2")
});

export const createNodeEntry = (
  key: string,
  props?: Partial<TreeDefinition>
) => ({
  [key]: {
    text: key,
    ...props,
    id: key
  }
});
