import {Video} from "../api";

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
  isChildrenHidden?: boolean;
}

export type ActionType = 'ArrowDown' | 'ArrowUp' | 'ArrowRight' | 'ArrowLeft';


export interface PlainAction {
  type: ActionType;
}


export interface SetAction {
  type: 'SET_NODES',
  videos: Video[]
}

export type Action = PlainAction | SetAction;
