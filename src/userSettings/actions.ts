import { UserSettingsAction } from "./types";
import { SelectionScope } from "../types";

export const select = (area: SelectionScope): UserSettingsAction => ({
  type: "SELECT_AREA",
  area
});
