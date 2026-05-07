import type { VariantProps } from 'tailwind-variants';
import type { HEADING_TAGS, TEXT_TAGS, TYPOGRAPHY_TAGS } from './constants';
import type { TEXT_TV_THEME, textTheme } from './textTheme';

export type TextThemeProps = VariantProps<typeof textTheme>;

export type TextSize = keyof typeof TEXT_TV_THEME.variants.size;
export type TextWeight = keyof typeof TEXT_TV_THEME.variants.weight;

export type HeadingTags = (typeof HEADING_TAGS)[number];
export type TextTag = (typeof TEXT_TAGS)[number];
export type TypographyTag = (typeof TYPOGRAPHY_TAGS)[number];

export type LabelProps = {
  labelFor?: string;
};

export type TextProps = LabelProps & {
  size?: TextSize;
  weight?: TextWeight;
  tag?: TypographyTag;
};
