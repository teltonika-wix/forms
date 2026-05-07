import type { ReadMoreType } from './readMoreTheme';

export type ReadMoreProps = {
  type: ReadMoreType;
  textOpened: string;
  textClosed: string;
  linesShown?: number;
};
