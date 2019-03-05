import { SelectionScope } from "../types";

interface SelectAction {
  type: "SELECT_AREA",
  area: SelectionScope
}

export type UserSettingsAction = SelectAction;
