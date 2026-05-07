import { jsonSchemaValidation } from "src/utilities";
import ipInfoDataSchema from "./ipInfoDataSchema.json";
import type { IPAddressInfo } from "./types";

export const validateIpInfoData = (ipInfoData: unknown): ipInfoData is IPAddressInfo => {
  try {
    const { isDataValid } = jsonSchemaValidation<IPAddressInfo>(ipInfoData, ipInfoDataSchema);

    return isDataValid;
  } catch (error) {
    return false;
  }
};
