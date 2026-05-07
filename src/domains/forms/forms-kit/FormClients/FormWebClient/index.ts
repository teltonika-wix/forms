import { getFormRenderingData } from "./getFormRenderingData";
import { sendFormData } from "./sendFormData";

export type * from "./getFormRenderingData";
export type * from "./sendFormData";
export type * from "./types";

export const FormWebClient = {
  getFormRenderingData,
  sendFormData,
};
