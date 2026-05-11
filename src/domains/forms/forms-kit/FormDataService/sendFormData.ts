import { FormServerClient } from "../FormClients/FormServerClient";
import { FormWebClient } from "../FormClients/FormWebClient";
import type { SendBrowserFormDataParams, SendServerFormDataParams } from "../types";

export type SendFormData = {
  (parameters: SendBrowserFormDataParams & Partial<SendServerFormDataParams>): Promise<Response>;
  (parameters: SendServerFormDataParams & Partial<SendBrowserFormDataParams>): Promise<Response>;
};

export const sendFormData: SendFormData = async ({
  formData,
  formUrlParameters,
  formWebClientEndpoint,
  formSecrets,
  isDev,
  signal,
}) => {
  if (typeof window !== "undefined") {
    if (!formWebClientEndpoint) {
      throw new Error(
        "To send form data on the browser side, the form api endpoint must be provided.",
      );
    }

    return FormWebClient.sendFormData({
      formData,
      formUrlParameters,
      formWebClientEndpoint,
      isDev,
      ...(signal ? { signal } : {}),
    });
  }

  if (!formSecrets) {
    throw new Error("To fetch form data on the server side, the form secrets must be provided.");
  }

  return FormServerClient.sendFormData({
    formData,
    formUrlParameters,
    formSecrets,
    ...(signal ? { signal } : {}),
  });
};
