import { tv } from 'tailwind-variants';

const INPUT_CHECKBOX_THEME = {
  slots: {
    checkbox: 'row-start-1 row-end-2 my-1 justify-self-center',
  },
} as const;

export const inputCheckboxTheme = tv(INPUT_CHECKBOX_THEME);
