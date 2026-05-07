import type { Sizes } from './types';

export const spinnerSizes: Sizes<number> = {
  small: 24,
  medium: 64,
  large: 96,
};

export const strokesBySize: Sizes<number> = {
  small: 4,
  medium: 8,
  large: 12,
};

export const dashesBySize: Sizes<string> = {
  small: '20,100',
  medium: '60,200',
  large: '100,200',
};
