import type { FieldThemeColorKeys } from "../fieldTheme";
import type { FieldColorThemingProps } from "../types";

export const getColor = (params: FieldColorThemingProps): FieldThemeColorKeys => {
  const { error, disabled, readonly } = params;

  if (error) {
    return "error";
  } else if (disabled) {
    return "disabled";
  } else if (readonly) {
    return "readOnly";
  }

  return "default";
};
