import { UserSettings } from "../types";
import { UserSettingsAction } from "./types";

const initial: UserSettings = {
  selection: "favorites"
};

export default (state = initial, action: UserSettingsAction): UserSettings => {
  if (action.type === "SELECT_AREA")
    return {
      ...state,
      selection: action.area
    };
  return state;
};
