import { tv } from 'tailwind-variants';

export type LabelColor = 'white' | 'dark' | 'light';
export type LabelVariants = { color: LabelColor };
export type LabelThemeVariants = { color: Record<LabelColor, string> };

export const labelColors: Record<LabelColor, string> = /*tw*/ {
  white: 'rounded-sm text-blue-800 bg-white',
  dark: 'rounded-sm bg-blue-800 text-white',
  light: 'rounded-sm text-blue-800 bg-blue-200',
};
export const labelDefaultVariants: LabelVariants = { color: 'light' };

export const labelVariants: LabelThemeVariants = {
  color: labelColors,
};

export const LABEL_TV_THEME = /*tw*/ {
  base: 'px-2 py-1 inline-flex',
  variants: labelVariants,
  defaultVariants: labelDefaultVariants,
};

export const labelTheme = tv(LABEL_TV_THEME);
