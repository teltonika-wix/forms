import { isString } from "src/utilities";
import { FORM_URL_PARAMETERS } from "../../formConstants";
import type { ExactFormUrlParameters } from "../../types";
import { isFormCode } from "../isFormCode";

export const validateFormParams = (
  formUrlParameters: Record<string, unknown>,
): ExactFormUrlParameters => {
  if (!formUrlParameters) {
    throw new Error(`Form url parameters not provided`);
  }

  FORM_URL_PARAMETERS.forEach((parameterKey) => {
    const parameterValue = formUrlParameters[parameterKey];

    if (!parameterValue || !isString(parameterValue)) {
      throw new Error(`One of form parameter is invalid: ${parameterKey}`);
    }

    if (parameterKey === "form") {
      if (!isFormCode(parameterValue)) {
        throw new Error(`Form code not allowed: ${parameterValue}`);
      }

      return;
    }

    if (parameterKey === "language") {
      if (parameterValue.length !== 2) {
        throw new Error(`Form language not allowed: ${parameterValue}`);
      }

      return;
    }
  });

  return { ...formUrlParameters } as ExactFormUrlParameters;
};
