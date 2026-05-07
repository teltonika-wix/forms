import type { GoogleClickIdRecord, GoogleClickIdUrlParams } from "../../types";
import { getExpiryData } from "../../utils/getExpiryData";

export const storeGoogleClickId = (
  storageKey: string,
  { googleClickId }: GoogleClickIdUrlParams,
): void => {
  try {
    const googleClickIdRecord: GoogleClickIdRecord = { googleClickId, expiryDate: getExpiryData() };
    localStorage.setItem(storageKey, JSON.stringify(googleClickIdRecord));
  } catch (error) {
    return;
  }
};
