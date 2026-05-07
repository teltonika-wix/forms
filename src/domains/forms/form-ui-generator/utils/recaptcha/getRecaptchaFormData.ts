import { FormValidationError } from "../FormValidationError";
import { RECAPTCHA_FORM_KEY } from "./constants";
import { retrieveRecaptchaToken } from "./retrieveRecaptchaToken";

const errorMessage =
  "Sorry, something went wrong and we couldn't verify your reCAPTCHA. Please try again.";

export type RecaptchaFormKey = string;
export type RecaptchaToken = string;

export const getRecaptchaFormData = async (
  siteKey: string,
): Promise<[RecaptchaFormKey, RecaptchaToken]> => {
  const token = await retrieveRecaptchaToken(siteKey);

  if (!token) {
    throw new FormValidationError(errorMessage);
  }

  return [RECAPTCHA_FORM_KEY, token];
};
