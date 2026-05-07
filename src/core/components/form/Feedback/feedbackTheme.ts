import { tv } from 'tailwind-variants';

export const FEEDBACK_TV_THEME = /*tw*/ {
  variants: {
    error: {
      true: {
        base: '',
        svgChecked: 'peer-checked:text-pink-700 peer-hover:text-pink-500',
        svgUnchecked: 'peer-hover:text-pink-500 text-pink-700',
      },
      false: {
        base: '',
        svgChecked: 'peer-checked:text-blue-600 peer-hover:text-blue-700',
        svgUnchecked: 'text-grey-400 peer-hover:text-grey-600',
      },
    },
  },
  defaultVariants: {
    error: false,
  },
  slots: {
    base: 'rounded-md leading-none inline-grid focus-within:ring-2 focus-within:ring-blue-600 focus-within:ring-offset-2',
    svgChecked: 'col-span-full row-span-full opacity-0  peer-checked:opacity-100 transition-all',
    svgUnchecked: 'col-span-full row-span-full peer-checked:opacity-0 transition-all',
    input: 'peer col-span-full row-span-full opacity-0 z-10 cursor-pointer',
  },
} as const;

export const feedbackTheme = tv(FEEDBACK_TV_THEME);
