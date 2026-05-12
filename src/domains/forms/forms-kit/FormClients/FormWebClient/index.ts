import { getFormRenderingData } from "./getFormRenderingData";
import { getIpLocationInfo } from "./getIpLocationInfo";
import { sendFormData } from "./sendFormData";

export type * from "./getFormRenderingData";
export type * from "./getIpLocationInfo";
export type * from "./sendFormData";
export type * from "./types";

export const FormWebClient = {
  getFormRenderingData,
  getIpLocationInfo,
  sendFormData,
};
