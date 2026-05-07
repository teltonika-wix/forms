import type { FieldThemePaddingsKeys } from "../fieldTheme";

export const getPaddings = (isLabel: boolean): FieldThemePaddingsKeys => {
  if (isLabel) return "default";

  return "verticalSmall";
};
