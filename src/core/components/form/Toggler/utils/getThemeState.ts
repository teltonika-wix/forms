import type { TogglerState } from "../types";

export const getThemeState = (
  isActive: boolean,
  isDisabled: boolean,
): TogglerState => {
  if (isDisabled) {
    return isActive ? "activeDisabled" : "inactiveDisabled";
  }

  return isActive ? "activeEnabled" : "inactiveEnabled";
};
