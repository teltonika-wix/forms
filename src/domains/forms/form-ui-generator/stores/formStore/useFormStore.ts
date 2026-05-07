import { formGlobalStore } from '../formGlobalStore';
import { type FormStore, createFormStore } from './createFormStore';

export const useFormStore = (formId: string): FormStore => {
  const formStore = formGlobalStore.getState()[formId];

  if (!formStore) {
    return formGlobalStore.addFormStore(formId, createFormStore());
  }

  return formStore;
};
