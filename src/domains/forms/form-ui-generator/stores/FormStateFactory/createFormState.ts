import { type FormMessages, FormMessagesFactory } from '../FormMessagesFactory';
import { type FormInputsState, createDefaultInputsState } from './createDefaultInputsState';
import { reactive } from 'vue';

export type FormState = { inputsState: FormInputsState; formMessages: FormMessages };

export const createFormState = (): FormState => {
  return {
    inputsState: reactive(createDefaultInputsState()),
    formMessages: reactive(FormMessagesFactory.createDefaultMessages()),
  };
};
