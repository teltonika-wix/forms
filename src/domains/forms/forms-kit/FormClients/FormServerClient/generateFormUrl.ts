import { createUrlWithParams, extractErrorMessage } from "src/utilities";
import type { ExactFormUrlParameters, FormSecretsParameter } from "../../types/formGeneralTypes";

export type GenerateFormUrlParams = FormSecretsParameter & {
  formUrlParameters?: ExactFormUrlParameters;
  endpoint: string;
};

export const generateFormUrl = async ({
  formUrlParameters,
  endpoint,
  formSecrets: { formMicroserviceUrl, formMicroserviceToken },
}: GenerateFormUrlParams): Promise<string> => {
  try {
    return createUrlWithParams({
      baseUrl: formMicroserviceUrl,
      endpoint,
      searchParams: {
        ...formUrlParameters,
        token: formMicroserviceToken,
      },
    });
  } catch (error) {
    const errorMessage = extractErrorMessage(error);

    throw new Error(`Failed to generate form url: ${errorMessage}`);
  }
};
