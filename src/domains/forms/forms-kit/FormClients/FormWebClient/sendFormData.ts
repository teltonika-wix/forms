import { createBadResponse, extractErrorMessage } from 'src/utilities';
import { validateFormParams } from '../../utils/validateFormParams';
import { createFullFormUrl } from './createFullFormUrl';
import type { FormWebClientParams } from './types';

export type SendFormDataParams = FormWebClientParams & {
  formData: FormData;
};

export const sendFormData = async ({
  formData,
  formUrlParameters,
  formWebClientEndpoint,
  isDev,
}: SendFormDataParams): Promise<Response> => {
  try {
    const validParameters = validateFormParams(formUrlParameters);
    const formUrl = createFullFormUrl({ searchParams: validParameters, formWebClientEndpoint, isDev });

    const response = await fetch(formUrl, {
      method: 'POST',
      body: formData,
    });

    return response;
  } catch (error) {
    const errorMessage = extractErrorMessage(error);

    return createBadResponse({ errorMessage });
  }
};
