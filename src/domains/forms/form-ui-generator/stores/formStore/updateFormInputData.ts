import type { FormInputData, FormState } from "../FormStateFactory";

export type FormInputItemParams<Key extends keyof FormInputData> = {
  key: Key;
  value: FormInputData[Key];
};
export type UpdateFormInputDataParams<Key extends keyof FormInputData> =
  FormInputItemParams<Key> & {
    formState?: FormState;
    inputName: string;
  };

export const updateFormInputData = <Key extends keyof FormInputData>({
  key,
  value,
  formState,
  inputName,
}: UpdateFormInputDataParams<Key>): void => {
  const formInputData = formState?.inputsState?.[inputName];

  if (!formInputData) {
    return;
  }
  console.log(key, value);
  formState.inputsState[inputName] = { ...formInputData, [key]: value };
};
