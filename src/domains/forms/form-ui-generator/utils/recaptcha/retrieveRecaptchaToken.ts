import { isString } from "src/utilities";

export const retrieveRecaptchaToken = async (siteKey: string): Promise<string | null> => {
  try {
    if (typeof window === "undefined" || !window.grecaptcha) {
      return null;
    }

    const recaptchaToken = await window.grecaptcha.execute(siteKey, { action: "submit" });

    if (!isString(recaptchaToken)) {
      return null;
    }

    return recaptchaToken;
  } catch (error) {
    return null;
  }
};
