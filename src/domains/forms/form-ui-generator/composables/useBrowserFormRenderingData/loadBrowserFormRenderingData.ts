import {
  type BrowserFormRenderingParams,
  FormDataService,
  type FormRenderingDataResponse,
} from "src/domains/forms/forms-kit";
import { FormRenderingDataCache } from "./FormRenderingDataCache";

export type LoadBrowserFormRenderingDataParams = BrowserFormRenderingParams;

export const loadBrowserFormRenderingData = async ({
  formWebClientEndpoint,
  formUrlParameters,
  isDev,
}: LoadBrowserFormRenderingDataParams): Promise<
  FormRenderingDataResponse | undefined
> => {
  const formCacheKey = JSON.stringify(formUrlParameters);
  const cachedData = FormRenderingDataCache.get(formCacheKey);

  if (cachedData) {
    return cachedData;
  }

  const remoteData = await FormDataService.getFormRenderingData({
    formUrlParameters,
    formWebClientEndpoint,
    isDev,
  });

  if (!remoteData || !Array.isArray(remoteData.inputs)) {
    return;
  }

  FormRenderingDataCache.set({ key: formCacheKey, value: remoteData });

  return remoteData;
};
