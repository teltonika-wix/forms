import { tv } from 'tailwind-variants';

export const base = /*tw*/ ``;

export const SEARCH_TV_THEME = {
  base,
  variants: {
    size: {
      large: {
        startIcon: 'size-8',
        divider: 'h-6',
        bodyText: 'text-body-large',
        inputHeight: 'h-8',
        closeIcon: 'size-8',
      },
      medium: {
        startIcon: 'size-6',
        divider: 'h-4',
        bodyText: 'text-body',
        inputHeight: 'h-6',
        closeIcon: 'size-6',
      },
    },
  },
  defaultVariants: {
    size: 'large',
  },
  slots: {
    startIcon: /*tw*/ ``,
    divider: /*tw*/ ``,
    bodyText: /*tw*/ ``,
    inputHeight: /*tw*/ ``,
    closeIcon: /*tw*/ ``,
  },
} as const;

export const searchTheme = tv(SEARCH_TV_THEME);

export type SearchSize = keyof typeof SEARCH_TV_THEME.variants.size;
