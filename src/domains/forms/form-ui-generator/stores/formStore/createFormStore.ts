import type { FormInputComponentData } from "src/domains/forms/forms-kit";
import { isObject } from "src/utilities";
import type { FormMessages } from "../FormMessagesFactory";
import {
  type FormInputErrorMessage,
  type FormInputValue,
  type FormInputsState,
  type FormState,
  FormStateFactory,
} from "../FormStateFactory";
import { updateFormInputData } from "./updateFormInputData";
import { type ComputedRef, computed } from "vue";

export type FormStore = {
  formState: FormState;
  formInputsState: FormInputsState;
  formMessagesState: FormMessages;
  getFormState: () => FormState;
  getFormInputsState: () => FormInputsState;
  getFormMessagesState: () => FormMessages;
  getIsFormActive: () => ComputedRef<boolean>;
  updateFormInputValue: (inputName: string, value: FormInputValue) => void;
  updateFormInputError: (inputName: string, errorMessage: FormInputErrorMessage) => void;
  addFormInput: (inputName: string, value: FormInputValue) => void;
  addFormMessage: <Key extends keyof FormMessages>(
    messageKey: Key,
    message: FormMessages[Key],
  ) => void;
  getFormInputNames: () => string[];
  setFormCompleted: (params?: { withError?: boolean }) => void;
  resetFormInputs: (formInputs: FormInputComponentData[]) => void;
};

export const createFormStore = (): FormStore => {
  const formState = FormStateFactory.createFormState();

  const getFormState: FormStore["getFormState"] = () => formState;
  const getFormInputsState: FormStore["getFormInputsState"] = () => formState.inputsState;
  const getFormMessagesState: FormStore["getFormMessagesState"] = () => formState.formMessages;
  const formInputsState = getFormInputsState();
  const formMessagesState = getFormMessagesState();

  const getIsFormActive: FormStore["getIsFormActive"] = () => {
    return computed(() => {
      if (formMessagesState.successfullySent.isActive) {
        return false;
      }

      if (formMessagesState.failedSent.isActive) {
        return false;
      }

      return true;
    });
  };

  const addFormInput: FormStore["addFormInput"] = (inputName, value) => {
    const existingValue = formState.inputsState[inputName]?.value;
    const errorMessage = formState.inputsState[inputName]?.errorMessage;
    const inputValue = existingValue !== undefined ? existingValue : value;

    formState.inputsState[inputName] = FormStateFactory.createInputData({
      value: inputValue,
      errorMessage,
    });
  };

  return {
    formState,
    formInputsState,
    formMessagesState,
    getFormState,
    getFormInputsState,
    getFormMessagesState,
    getIsFormActive,
    updateFormInputValue: (inputName, value) => {
      updateFormInputData({ formState, inputName, value, key: "value" });
    },
    updateFormInputError: (inputName, errorMessage) => {
      updateFormInputData({
        formState,
        inputName,
        value: errorMessage,
        key: "errorMessage",
      });
    },
    addFormInput,
    addFormMessage: (messageKey, message) => {
      formMessagesState[messageKey] = message;
    },
    getFormInputNames: () => {
      if (!isObject(formState.inputsState)) {
        return [];
      }

      return Object.keys(formState.inputsState);
    },
    setFormCompleted: ({ withError } = {}) => {
      if (withError) {
        formMessagesState.failedSent.isActive = true;

        return;
      }

      formMessagesState.successfullySent.isActive = true;
    },
    resetFormInputs: (formInputs) => {
      formInputs.forEach((formInputData) => {
        if (!formInputData?.attributes?.name) {
          return;
        }

        const { name } = formInputData.attributes;

        formState.inputsState[name] = FormStateFactory.createInputData({
          value: formInputData?.defaultValue,
        });
      });
    },
  };
};
