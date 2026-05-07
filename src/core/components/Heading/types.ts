import type { VariantProps } from 'tailwind-variants';
import type { TypographyTag } from '../Text';
import type { HEADING_TV_THEME, headingTheme } from './headingTheme';

export type HeadingThemeProps = VariantProps<typeof headingTheme>;

export type HeadingSize = keyof typeof HEADING_TV_THEME.variants.size;
export type HeadingWeight = keyof typeof HEADING_TV_THEME.variants.weight;

export type HeadingProps = {
  size: HeadingSize;
  weight?: HeadingWeight;
  tag?: TypographyTag;
  name?: string;
  id?: string;
};
