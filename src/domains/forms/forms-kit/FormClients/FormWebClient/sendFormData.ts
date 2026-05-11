import { createBadResponse, extractErrorMessage } from "src/utilities";
import { validateFormParams } from "../../utils/validateFormParams";
import { createFullFormUrl } from "./createFullFormUrl";
import type { FormWebClientParams } from "./types";

export type SendFormDataParams = FormWebClientParams & {
  formData: FormData;
  signal?: AbortSignal;
};

const isAbortError = (error: unknown): boolean => {
  if (typeof DOMException !== "undefined" && error instanceof DOMException) {
    return error.name === "AbortError";
  }

  return error instanceof Error && error.name === "AbortError";
};

export const sendFormData = async ({
  formData,
  formUrlParameters,
  formWebClientEndpoint,
  isDev,
  signal,
}: SendFormDataParams): Promise<Response> => {
  try {
    const validParameters = validateFormParams(formUrlParameters);
    const formUrl = createFullFormUrl({
      searchParams: validParameters,
      formWebClientEndpoint,
      isDev,
    });

    const response = await fetch(formUrl, {
      method: "POST",
      body: formData,
      ...(signal ? { signal } : {}),
    });

    return response;
  } catch (error) {
    if (isAbortError(error)) {
      throw error;
    }

    const errorMessage = extractErrorMessage(error);

    return createBadResponse({ errorMessage });
  }
};
