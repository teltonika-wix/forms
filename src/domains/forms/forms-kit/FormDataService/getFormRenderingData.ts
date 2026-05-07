import { FormServerClient } from "../FormClients/FormServerClient";
import { FormWebClient } from "../FormClients/FormWebClient";
import type {
  BrowserFormRenderingParams,
  FormRenderingDataResponse,
  ServerFormRenderingParams,
} from "../types";
import { addDefaultLocation } from "./defaultValues/addDefaultLocation";
import { getIpInfo } from "./ipInfo";

export type GetFormRenderingData = {
  (
    parameters: BrowserFormRenderingParams & Partial<ServerFormRenderingParams>,
  ): Promise<FormRenderingDataResponse>;
  (
    parameters: ServerFormRenderingParams & Partial<BrowserFormRenderingParams>,
  ): Promise<FormRenderingDataResponse>;
};

export const getFormRenderingData: GetFormRenderingData = async ({
  formWebClientEndpoint,
  formSecrets,
  clientIp,
  formUrlParameters,
  isDev,
}) => {
  if (typeof window !== "undefined") {
    if (!formWebClientEndpoint) {
      throw new Error(
        "To fetch form data on the browser side, the form api endpoint must be provided.",
      );
    }

    return FormWebClient.getFormRenderingData({ formUrlParameters, formWebClientEndpoint, isDev });
  }

  if (!formSecrets) {
    throw new Error("To fetch form data on the server side, the form secrets must be provided.");
  }

  const [formRenderingData, ipInfo] = await Promise.all([
    FormServerClient.getFormRenderingData({ formUrlParameters, formSecrets }),
    getIpInfo({ clientIp, formSecrets }),
  ]);

  if (!ipInfo) {
    return formRenderingData;
  }

  formRenderingData.inputs = addDefaultLocation({
    formInputComponents: formRenderingData.inputs,
    ipInfo,
  });

  return formRenderingData;
};
