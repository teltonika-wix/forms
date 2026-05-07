import { tv } from 'tailwind-variants';
import { buttonTheme } from '../Button/buttonTheme';

export const linkStyledAsButtonTheme = tv({
  extend: buttonTheme,
  base: ['inline-flex', 'text-center'],
});
export const { defaultVariants } = linkStyledAsButtonTheme;
