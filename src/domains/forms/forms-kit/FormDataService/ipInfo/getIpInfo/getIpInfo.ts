import { FormServerClient } from '../../../FormClients/FormServerClient';
import type { FormSecretsParameter } from '../../../types';
import { type IPAddressInfo, validateIpInfoData } from '../validateIpInfoData';

export type GetIpInfoParams = FormSecretsParameter & { clientIp?: string };

export const getIpInfo = async ({ clientIp, formSecrets }: GetIpInfoParams): Promise<IPAddressInfo | null> => {
  try {
    if (!clientIp) {
      return null;
    }

    const ipInfoResponse = await FormServerClient.getIpLocationInfo({ userIp: clientIp, formSecrets });
    const ipInfoResponseData = await ipInfoResponse.json();

    const ipInfoData = ipInfoResponseData?.data;

    if (!validateIpInfoData(ipInfoData)) {
      return null;
    }

    return ipInfoData;
  } catch (error) {
    return null;
  }
};
