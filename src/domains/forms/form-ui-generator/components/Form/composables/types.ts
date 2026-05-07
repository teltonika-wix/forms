import type { FormInvalidInputsData, FormUrlParameters } from "src/domains/forms/forms-kit";

export type FormSubmitEventStatus = "beforeSubmit" | "success" | "error" | "unexpectedError";

export type FormBeforeSubmitEvent = { status: "beforeSubmit" };
export type FormSuccessEvent = {
  status: "success";
  formCode: string;
  formUrlParameters: FormUrlParameters;
  formData: FormData;
};
export type FormSubmitErrorEvent = {
  status: "error";
  errors: FormInvalidInputsData;
  formData: FormData;
};
export type FormSubmitUnexpectedErrorEvent = {
  status: "unexpectedError";
  error: unknown;
};

export type FormSubmitEvent =
  | FormBeforeSubmitEvent
  | FormSuccessEvent
  | FormSubmitErrorEvent
  | FormSubmitUnexpectedErrorEvent;

export type FormSubmitEventHandler = (params: FormSubmitEvent) => void;
