import {
  createBadResponse,
  extractErrorMessage,
} from "src/utilities";
import { FormDataService } from "../../FormDataService";
import { FormUrl } from "../FormUrl";
import type { BaseFormApiParams } from "../types";

export type GetFormStructureParams = BaseFormApiParams;

export const getFormStructure = async ({
  url,
  clientIp,
  formSecrets,
}: GetFormStructureParams): Promise<Response> => {
  try {
    const formUrlParameters = FormUrl.extractFormSearchParams({ url });
    const formRenderingData = await FormDataService.getFormRenderingData({
      formUrlParameters,
      clientIp,
      formSecrets,
    });

    if (!formRenderingData) {
      return createBadResponse({
        errorMessage: "Form rendering data does not provided",
      });
    }

    return new Response(JSON.stringify(formRenderingData));
  } catch (error) {
    const errorMessage =
      extractErrorMessage(error) || "Failed to get form structure";

    return createBadResponse({ errorMessage });
  }
};
