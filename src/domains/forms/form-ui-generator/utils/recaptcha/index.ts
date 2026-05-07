import { getRecaptchaFormData } from "./getRecaptchaFormData";
import { retrieveRecaptchaToken } from "./retrieveRecaptchaToken";

export type * from "./getRecaptchaFormData";
export type * from "./retrieveRecaptchaToken";
export * from "./constants";

export const Recaptcha = {
  getRecaptchaFormData,
  retrieveRecaptchaToken,
};
