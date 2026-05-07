import type { InputLabelThemeColorKeys } from "../InputLabelTheme";

export const geLabelColorVariant = (
  error: boolean,
  disabled: boolean,
): InputLabelThemeColorKeys => {
  if (error) return "error";
  else if (disabled) return "disabled";

  return "default";
};
