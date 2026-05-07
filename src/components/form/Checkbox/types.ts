import type { VariantProps } from "tailwind-variants";
import type { checkboxTheme } from "./checkboxTheme";

export type CheckboxThemeProps = VariantProps<typeof checkboxTheme>;

export type CheckboxProps = {
  size?: CheckboxThemeProps["size"];
  error?: CheckboxThemeProps["error"];
  id?: string;
  name?: string;
  value?: number | boolean | null;
};

export type CheckboxValueChange = (event: Event, value: boolean) => void;

export type CheckboxEmits = {
  onValueChange: Parameters<CheckboxValueChange>;
};
