import type { FormRenderingDataResponse } from "src/domains/forms/forms-kit";
import {
  type FormMessageData,
  FormMessagesFactory,
} from "../stores/FormMessagesFactory";

export type ExtractFormMessagesReturn = {
  successMessageData: FormMessageData;
  errorMessageData: FormMessageData;
};

export const extractFormMessages = (
  formRenderingData: FormRenderingDataResponse,
): ExtractFormMessagesReturn => {
  const { successTitle, successMessage, errorTitle, errorMessage } =
    formRenderingData || {};

  const successMessageData = FormMessagesFactory.createFormMessage({
    title: successTitle,
    message: successMessage,
  });
  const errorMessageData = FormMessagesFactory.createFormMessage({
    title: errorTitle,
    message: errorMessage,
  });

  return { successMessageData, errorMessageData };
};
