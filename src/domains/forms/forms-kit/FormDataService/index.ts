import { getFormRenderingData } from "./getFormRenderingData";
import { getValidationData } from "./getValidationData";
import { sendFormData } from "./sendFormData";

export type * from "./getFormRenderingData";
export type * from "./getValidationData";
export type * from "./sendFormData";

export const FormDataService = {
  getFormRenderingData,
  getValidationData,
  sendFormData,
};
