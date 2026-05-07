import { getFormRenderingData } from "./getFormRenderingData";
import { getIpLocationInfo } from "./getIpLocationInfo";
import { sendFormData } from "./sendFormData";

export type * from "./getFormRenderingData";
export type * from "./getIpLocationInfo";
export type * from "./sendFormData";

export const FormServerClient = {
  getIpLocationInfo,
  getFormRenderingData,
  sendFormData,
};
