import { FormWebClient } from "../../../FormClients/FormWebClient";
import type { FormWebClientParams } from "../../../FormClients/FormWebClient";
import { type IPAddressInfo, validateIpInfoData } from "../validateIpInfoData";

export type GetBrowserIpInfoParams = Pick<FormWebClientParams, "formWebClientEndpoint" | "isDev">;

export const getBrowserIpInfo = async ({
  formWebClientEndpoint,
  isDev,
}: GetBrowserIpInfoParams): Promise<IPAddressInfo | null> => {
  try {
    const locationInfoResponse = await FormWebClient.getIpLocationInfo({
      formWebClientEndpoint,
      isDev,
    });
    const locationInfoResponseData = await locationInfoResponse.json();
    const ipInfoData = locationInfoResponseData?.data;

    if (!validateIpInfoData(ipInfoData)) {
      return null;
    }

    return ipInfoData;
  } catch (error) {
    return null;
  }
};
