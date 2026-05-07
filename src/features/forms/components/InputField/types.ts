import type { FieldProps } from "src/legacy/core/components/form/Field";

export type InputFieldProps = FieldProps & {
  name?: string;
  id?: string;
  placeholder?: string;
  inputValue?: string;
  maxLength?: number;
};

export type InputFieldValueChange = (event: Event, value: string | undefined) => void;

export type InputFiledEmits = {
  onValueUpdate: Parameters<InputFieldValueChange>;
};
