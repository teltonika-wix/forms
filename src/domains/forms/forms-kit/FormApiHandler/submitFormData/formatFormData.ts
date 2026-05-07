import { extractErrorMessage } from "src/utilities";
import type { ClientIp } from "../types";

export type FormatFormDataParams = {
  formData: FormData;
  clientIp: ClientIp;
};

export type FormatFormDataReturn = Promise<{
  errorMessage: string;
  formattedFormData?: FormData;
}>;

export const formatFormData = async ({
  formData,
  clientIp,
}: FormatFormDataParams): FormatFormDataReturn => {
  try {
    formData.append("client_ip", clientIp);

    return { formattedFormData: formData, errorMessage: "" };
  } catch (error) {
    const errorMessage = extractErrorMessage(error);

    return { errorMessage };
  }
};
