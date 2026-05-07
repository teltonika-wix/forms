import type {
  CheckboxProps,
  CheckboxValueChange,
} from 'src/legacy/core/components/form/Checkbox';

export type InputCheckboxEmits = {
  onValueChange: Parameters<CheckboxValueChange>;
};

export type InputCheckboxProps = CheckboxProps & {
  dataTestId?: string;
};
