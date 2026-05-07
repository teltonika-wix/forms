import type { FieldProps } from 'src/legacy/core/components/form/Field';

export type TextareaFieldProps = FieldProps & {
  name?: string;
  id?: string;
  rows?: number;
  placeholder?: string;
  value?: string;
};

export type TextareaValueChange = (event: Event, value: string | undefined) => void;

export type TextareaFieldEmits = {
  onValueUpdate: Parameters<TextareaValueChange>;
};
