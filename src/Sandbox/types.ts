export interface AppState {
  nodes: TreeNode[];
  selectedNode: string;
}

export interface TreeNode {
  id: string;
  children?: TreeNode[];
  text: string;
}

export type ActionType = 'ArrowDown' | 'ArrowUp';


export interface Action {
  type: ActionType;
}
