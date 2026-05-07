import { isSuccessfulStatusCode } from 'src/utilities';
import type { FormSecretsParameter } from '../../types';
import { generateFormUrl } from './generateFormUrl';

export const LOCATION_ENDPOINT = '/location';

export type GetIpLocationInfoParams = FormSecretsParameter & { userIp: string };

export const getIpLocationInfo = async ({ userIp, formSecrets }: GetIpLocationInfoParams): Promise<Response> => {
  const formUrl = await generateFormUrl({ endpoint: `${LOCATION_ENDPOINT}/${userIp}`, formSecrets });

  const response = await fetch(formUrl);

  if (!isSuccessfulStatusCode(response.status)) {
    throw new Error('Failed to fetch form structure');
  }

  return response;
};
