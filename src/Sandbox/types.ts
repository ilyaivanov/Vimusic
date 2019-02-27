export interface AppState {
  nodes: TreeNode;
  selectedNode: string;
  rootNodes: string[];
}

export interface TreeNode {
  [id: string]: TreeDefinition;
}

export interface TreeDefinition {
  id: string;
  children?: string[];
  text: string;
}

export type ActionType = 'ArrowDown' | 'ArrowUp';


export interface Action {
  type: ActionType;
}
