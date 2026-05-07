import { createBadResponse, extractErrorMessage } from "src/utilities";
import { FormDataService } from "../../FormDataService";
import { FormUrl } from "../FormUrl";
import type { BaseFormApiParams } from "../types";
import { formatFormData } from "./formatFormData";

export type SubmitFormDataParams = BaseFormApiParams & { formData: FormData };

export const submitFormData = async ({
  url,
  clientIp,
  formSecrets,
  formData,
}: SubmitFormDataParams): Promise<Response> => {
  try {
    const formUrlParameters = FormUrl.extractFormSearchParams({ url });
    const { formattedFormData, errorMessage } = await formatFormData({
      formData,
      clientIp,
    });

    if (!formattedFormData) {
      return createBadResponse({ errorMessage });
    }

    const response = await FormDataService.sendFormData({
      formData: formattedFormData,
      formUrlParameters,
      formSecrets,
    });

    return response;
  } catch (error) {
    const errorMessage = extractErrorMessage(error) || "Failed to send form data.";

    return createBadResponse({ errorMessage });
  }
};
