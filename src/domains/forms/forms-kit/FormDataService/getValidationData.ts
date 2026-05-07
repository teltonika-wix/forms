import { isObject } from 'src/utilities';
import type { FormValidationErrorData, FormValidationErrorResponse } from '../types';

export const getValidationData = async (response: Response): Promise<Partial<FormValidationErrorData>> => {
  try {
    const responseData = (await response.json()) as FormValidationErrorResponse;

    if (!responseData || !responseData?.data?.errors || !isObject(responseData.data.errors)) {
      return {};
    }

    return responseData.data;
  } catch (error) {
    return {};
  }
};
