import type { FormInputData } from './createInputData';

export type FormInputsState = { [key in string]?: FormInputData };

export const createDefaultInputsState = (): FormInputsState => {
  return {};
};
