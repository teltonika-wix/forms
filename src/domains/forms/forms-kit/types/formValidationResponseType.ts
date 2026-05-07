export type FormSubmitResponse = FormValidationErrorResponse;
export type FormInputName = string;

export type FormInvalidInputsData = Record<FormInputName, string>;

export type FormValidationErrorData = {
  errors: FormInvalidInputsData;
  message: string;
};

export type FormValidationErrorResponse = {
  data: FormValidationErrorData;
};
