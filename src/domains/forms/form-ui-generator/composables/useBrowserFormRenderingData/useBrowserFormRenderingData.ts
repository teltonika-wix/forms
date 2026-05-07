import type { FormRenderingDataResponse } from "src/domains/forms/forms-kit";
import {
  type LoadBrowserFormRenderingDataParams,
  loadBrowserFormRenderingData,
} from "./loadBrowserFormRenderingData";
import { type Ref, ref } from "vue";

export type UseBrowserFormRenderingDataReturn = {
  isLoading: Ref<boolean>;
  formRenderingData: Ref<FormRenderingDataResponse | null>;
  clientFullUrl: string;
};

export type UseBrowserFormRenderingDataParams = LoadBrowserFormRenderingDataParams;

export const useBrowserFormRenderingData = (
  parameters: UseBrowserFormRenderingDataParams,
): UseBrowserFormRenderingDataReturn => {
  const isLoading = ref(true);
  const formRenderingData = ref<FormRenderingDataResponse | null>(null);
  const clientFullUrl = window.location.href;

  loadBrowserFormRenderingData(parameters)
    .then((data) => {
      if (!data) {
        return;
      }

      formRenderingData.value = data;
    })
    .finally(() => {
      isLoading.value = false;
    });

  return {
    isLoading,
    formRenderingData,
    clientFullUrl,
  };
};
