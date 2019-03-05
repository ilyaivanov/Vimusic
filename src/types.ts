import { PlayerAction, PlayerState } from "./player/types";
import { Store } from "redux";

export type Dispatch = (action: Action) => void;

export interface State {
  player: PlayerState;
}

export type VimusicStore = Store<State, PlayerAction>;

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
  youtubeId?: string;
  isChildrenHidden?: boolean;
  isLoading?: boolean;
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
  nodes: TreeDefinition[];
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


export interface SetChildrenAction {
  type: "SET_CHILDREN";
  parentId: string;
  children: TreeDefinition[];
}

export interface SetRootsAction {
  type: "SET_ROOTS";
  roots: string[];
}


export interface RestoreAction {
  type: "RESTORE";
  savedState: AppState;
}

export type Action = PlainAction | SetAction | EditAction | CreateAction | DeleteAction | SelectAction | SetChildrenAction | SetRootsAction | RestoreAction;


export type AppStateActionCreator = (state: AppState, dispatch: Dispatch) => void;

