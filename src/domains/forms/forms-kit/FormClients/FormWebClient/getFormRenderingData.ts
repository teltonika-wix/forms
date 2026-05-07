import { isSuccessfulStatusCode } from 'src/utilities';
import type { FormRenderingDataResponse } from '../../types';
import { validateFormParams } from '../../utils/validateFormParams';
import { createFullFormUrl } from './createFullFormUrl';
import type { FormWebClientParams } from './types';

export type GetFormRenderingDataParams = FormWebClientParams;

export const getFormRenderingData = async ({
  formUrlParameters,
  formWebClientEndpoint,
  isDev,
}: GetFormRenderingDataParams): Promise<FormRenderingDataResponse> => {
  const validParameters = validateFormParams(formUrlParameters);
  const formUrl = createFullFormUrl({ searchParams: validParameters, formWebClientEndpoint, isDev });
  const formDataResponse = await fetch(formUrl);

  if (!isSuccessfulStatusCode(formDataResponse.status)) {
    throw new Error('Failed to fetch form structure');
  }

  const response = await formDataResponse.json();

  if (!response) {
    throw new Error(`Response data doesn't provided`);
  }

  return response;
};
