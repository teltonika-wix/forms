import { isObject, isString } from 'src/utilities';

export const getGoogleClickId = (storageKey: string): string | null => {
  try {
    const googleClickIdRecordString = localStorage.getItem(storageKey);

    if (!isString(googleClickIdRecordString)) {
      return null;
    }

    const googleClickIdRecord = JSON.parse(googleClickIdRecordString) as unknown;

    if (
      !isObject(googleClickIdRecord) ||
      !isString(googleClickIdRecord?.googleClickId) ||
      typeof googleClickIdRecord?.expiryDate !== 'number'
    ) {
      return null;
    }

    const isGoogleClickIdValid = new Date().getTime() < googleClickIdRecord.expiryDate;

    if (!isGoogleClickIdValid) {
      return null;
    }

    return googleClickIdRecord.googleClickId;
  } catch (error) {
    return null;
  }
};
