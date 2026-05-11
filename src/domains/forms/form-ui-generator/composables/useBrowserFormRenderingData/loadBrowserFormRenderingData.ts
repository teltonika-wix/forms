import {
  type BrowserFormRenderingParams,
  FormDataService,
  type FormRenderingDataResponse,
} from "src/domains/forms/forms-kit";
import { FormRenderingDataCache } from "./FormRenderingDataCache";

export type LoadBrowserFormRenderingDataParams = BrowserFormRenderingParams;

const inFlightFormRenderingDataRequests = new Map<
  string,
  Promise<FormRenderingDataResponse | undefined>
>();

export const loadBrowserFormRenderingData = async ({
  formWebClientEndpoint,
  formUrlParameters,
  isDev,
}: LoadBrowserFormRenderingDataParams): Promise<FormRenderingDataResponse | undefined> => {
  const formCacheKey = JSON.stringify(formUrlParameters);
  const cachedData = FormRenderingDataCache.get(formCacheKey);

  if (cachedData) {
    return cachedData;
  }

  const inFlightRequest = inFlightFormRenderingDataRequests.get(formCacheKey);
  if (inFlightRequest) {
    return inFlightRequest;
  }

  const request = FormDataService.getFormRenderingData({
    formUrlParameters,
    formWebClientEndpoint,
    isDev,
  })
    .then((remoteData) => {
      if (!remoteData || !Array.isArray(remoteData.inputs)) {
        return;
      }

      FormRenderingDataCache.set({ key: formCacheKey, value: remoteData });

      return remoteData;
    })
    .finally(() => {
      inFlightFormRenderingDataRequests.delete(formCacheKey);
    });

  inFlightFormRenderingDataRequests.set(formCacheKey, request);

  return request;
};
