import type { LabelProps } from '../../Text';

export interface InputLabelProps extends LabelProps {
  error?: boolean | undefined;
  disabled?: boolean | undefined;
}
