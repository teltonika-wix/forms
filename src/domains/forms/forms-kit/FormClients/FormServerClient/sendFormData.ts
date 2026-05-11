import type { FormSecretsParameter, FormUrlParameters } from "../../types/formGeneralTypes";
import { validateFormParams } from "../../utils/validateFormParams";
import { generateFormUrl } from "./generateFormUrl";

export type SendFormDataParams = FormSecretsParameter & {
  formData: FormData;
  formUrlParameters: FormUrlParameters;
  signal?: AbortSignal;
};

export const FORMS_SUBMIT_ENDPOINT = "/form/submit";

export const sendFormData = async ({
  formData,
  formUrlParameters,
  formSecrets,
  signal,
}: SendFormDataParams): Promise<Response> => {
  const formParameters = validateFormParams(formUrlParameters);
  const formUrl = await generateFormUrl({
    formUrlParameters: formParameters,
    endpoint: FORMS_SUBMIT_ENDPOINT,
    formSecrets,
  });

  return fetch(formUrl, {
    method: "POST",
    body: formData,
    ...(signal ? { signal } : {}),
  });
};
