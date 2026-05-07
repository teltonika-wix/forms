import { type LabelProps } from '../../Text';

// TODO: divide to public and private FieldProps. Add FieldExternalProps that should be used in parent components
export interface FieldProps extends LabelProps {
  error?: string;
  label?: string;
  comment?: string;
  disabled?: boolean;
  readonly?: boolean;
}

export type FieldColorThemingProps = {
  error: boolean;
  disabled: boolean;
  readonly: boolean;
};
