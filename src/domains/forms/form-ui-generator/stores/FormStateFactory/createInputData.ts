export type FormInputValue = string | boolean;
export type FormInputErrorMessage = string;

export type FormInputData = {
  errorMessage: FormInputErrorMessage;
  value: FormInputValue;
};

export const createInputData = (params?: Partial<FormInputData>): FormInputData => {
  const { errorMessage, value } = params || {};

  return {
    errorMessage: errorMessage || "",
    value: value === undefined ? "" : value,
  };
};
