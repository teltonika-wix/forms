import type { GoogleClickIdRecord } from "../../types";

export const EXPIRY_PERIOD_IN_MS = 7776000000; // 90 day expiry in milliseconds

export const getExpiryData = (): GoogleClickIdRecord["expiryDate"] => {
  const expiryDate = new Date().getTime() + EXPIRY_PERIOD_IN_MS;

  return expiryDate;
};
