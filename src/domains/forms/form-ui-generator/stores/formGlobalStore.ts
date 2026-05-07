import type { FormStore } from './formStore/createFormStore';
import { reactive } from 'vue';

export type FormGlobalState = { [key in string]?: FormStore };

const defaultFormGlobalState = {};
const formGlobalState: FormGlobalState = reactive(defaultFormGlobalState);

const addFormStore = (formId: string, formStore: FormStore): FormStore => {
  if (formGlobalState[formId]) {
    return formStore;
  }

  formGlobalState[formId] = formStore;

  return formStore;
};

export const formGlobalStore = {
  getState: (): FormGlobalState => formGlobalState,
  addFormStore,
};
