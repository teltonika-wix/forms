import { ADWORDS_KEY } from "../../../utils/Adwords";
import { isAdwords } from "../../../utils/adwords/isAdwords";
import { Recaptcha } from "../../../utils/Recaptcha";

export type CreateFormDataParams = {
  event: Event;
  recaptchaSiteKey: string;
};

export const createFormData = async ({
  event,
  recaptchaSiteKey,
}: CreateFormDataParams): Promise<{ formData: FormData; recaptchaKey: string }> => {
  const formElement = event.target;

  if (!formElement || !(formElement instanceof HTMLFormElement)) {
    throw new Error("Event target is not a form HTML element.");
  }

  const [recaptchaKey, recaptchaToken] = await Recaptcha.getRecaptchaFormData(recaptchaSiteKey);

  const formData = new FormData(formElement);
  formData.append(recaptchaKey, recaptchaToken);

  try {
    formData.append(ADWORDS_KEY, `${isAdwords()}`);
  } catch (ex) {
    console.warn("Something wrong with adwords", ex);
  }

  return { formData, recaptchaKey };
};
