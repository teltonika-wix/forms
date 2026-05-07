import { createFormState } from "./createFormState";
import { createInputData } from "./createInputData";

export type * from "./createDefaultInputsState";
export type * from "./createFormState";
export type * from "./createInputData";

export const FormStateFactory = {
  createFormState,
  createInputData,
};
