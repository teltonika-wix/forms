import { type Side } from '@floating-ui/vue';
import { getOpposedSide } from './getOpposedSide';

export type GetArrowStylesParams = { toolTipPlacement: Side; x?: number; y?: number; isFlipped: boolean };
export type GetArrowStylesReturn = {
  [key in Side]?: string;
} & {
  left: string;
  top: string;
};

export const getArrowStyles = ({ toolTipPlacement, x, y, isFlipped }: GetArrowStylesParams): GetArrowStylesReturn => {
  const placement: Side = isFlipped ? toolTipPlacement : getOpposedSide(toolTipPlacement);

  // The keys "top" and "left" must exist in returned object.
  // Documentation link: https://floating-ui.com/docs/arrow#:~:text=%7D)%3B-,Important,-Unlike%20the%20floating
  return {
    left: x != null ? `${x}px` : '',
    top: y != null ? `${y}px` : '',
    [placement]: '-4px',
  };
};
