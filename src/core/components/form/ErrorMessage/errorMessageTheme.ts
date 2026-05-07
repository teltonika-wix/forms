import { tv } from 'tailwind-variants';

const base = 'text-pink-700 dark:text-pink-300';

const ERROR_MESSAGE_THEME = {
  slots: {
    icon: `${base} size-4`,
    text: `${base}`,
  },
};
export const errorMessageTheme = tv(ERROR_MESSAGE_THEME);
