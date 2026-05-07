import type { FormInvalidInputsData } from "src/domains/forms/forms-kit";
import { isKeyInObject, isString } from "src/utilities";
import { useFormStore } from "../../../stores/formStore";

export type UpdateFormInputErrorStatesParams = {
  formCode: string;
  errors: FormInvalidInputsData;
  recaptchaKey: string;
};

export const updateFormInputErrorStates = ({
  formCode,
  errors,
  recaptchaKey,
}: UpdateFormInputErrorStatesParams): void => {
  const { updateFormInputError, addFormMessage, getFormInputNames } = useFormStore(formCode);

  const recaptchaErrorMessage = errors[recaptchaKey];

  if (isString(recaptchaErrorMessage)) {
    addFormMessage("submitError", recaptchaErrorMessage);
  }

  getFormInputNames().forEach((inputName) => {
    if (isKeyInObject(inputName, errors) && isString(errors[inputName])) {
      const errorMessage = errors[inputName] || "";
      updateFormInputError(inputName, errorMessage);

      return;
    }

    updateFormInputError(inputName, "");
  });
};
