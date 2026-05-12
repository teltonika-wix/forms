import { isSuccessfulStatusCode } from "src/utilities";
import type { FormRenderingDataResponse } from "../../types/formDataTypes";
import type { FormSecretsParameter, FormUrlParameters } from "../../types/formGeneralTypes";
import { validateFormParams } from "../../utils/validateFormParams";
import { generateFormUrl } from "./generateFormUrl";

export const FORMS_GET_ENDPOINT = "/form";

export type GetFormRenderingDataParams = FormSecretsParameter & {
  formUrlParameters: FormUrlParameters;
};

export const getFormRenderingData = async ({
  formUrlParameters: rawFormUrlParameters,
  formSecrets,
}: GetFormRenderingDataParams): Promise<FormRenderingDataResponse> => {
  const formUrlParameters = validateFormParams(rawFormUrlParameters);
  const formUrl = await generateFormUrl({
    formUrlParameters,
    endpoint: FORMS_GET_ENDPOINT,
    formSecrets,
  });
  const formDataResponse = await fetch(formUrl);

  if (!isSuccessfulStatusCode(formDataResponse.status)) {
    throw new Error("Failed to fetch form structure");
  }

  const response = await formDataResponse.json();

  if (response && typeof response === "object" && "code" in response) {
    return response as FormRenderingDataResponse;
  }

  if (response && typeof response === "object" && "data" in response) {
    return response.data as FormRenderingDataResponse;
  }

  throw new Error(`Response data doesn't provided`);
};
