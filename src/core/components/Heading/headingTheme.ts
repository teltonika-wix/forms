import { tv } from 'tailwind-variants';

export const HEADING_TV_THEME = /*tw*/ {
  base: 'uppercase font-oswald break-words',
  variants: {
    size: {
      '2xl': 'text-heading-xl md:text-heading-2xl',
      xl: 'text-heading-l md:text-heading-xl',
      l: 'text-heading-m md:text-heading-l',
      m: 'text-heading-s md:text-heading-m',
      s: 'text-heading-s',
      xs: 'text-heading-xs',
    },
    weight: {
      light: 'font-extralight',
      medium: 'font-medium',
    },
  },
  defaultVariants: {
    size: 'xl',
    weight: 'medium',
  },
} as const;

export const headingTheme = tv(HEADING_TV_THEME);
