import {Video} from "../api";

export type Dispatch = (action: Action) => void;

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
  isEditing?: boolean;
}

export type ActionType =
  | "ArrowDown"
  | "ArrowUp"
  | "ArrowRight"
  | "ArrowLeft"
  | "SAMPLE";

export interface PlainAction {
  type: ActionType;
}

export interface SetAction {
  type: "SET_NODES";
  videos: Video[];
}

export interface EditAction {
  type: "EditNode";
  nodeId: string;
  props: Partial<TreeDefinition>;
}

export interface CreateAction {
  type: "CreateNode";
  placeBefore: string;
  props: Partial<TreeDefinition>;
}

export interface DeleteAction {
  type: "Delete";
  nodeId: string;
}

export interface SelectAction {
  type: "SELECT_NODE";
  nodeId: string;
}


export type Action = PlainAction | SetAction | EditAction | CreateAction | DeleteAction | SelectAction;
