import type { ButtonColor, ButtonSize, ButtonWidth } from './buttonTheme';
import type { ButtonHTMLAttributes } from 'vue';

export type ButtonProps = {
  color: ButtonColor;
  size: ButtonSize;
  width?: ButtonWidth;
  disabled?: boolean;
  type?: ButtonHTMLAttributes['type'];
};

export type ButtonEmits = {
  click: [event: Event];
};
