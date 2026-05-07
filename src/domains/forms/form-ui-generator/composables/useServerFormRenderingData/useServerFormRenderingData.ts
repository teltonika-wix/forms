import {
  FormDataService,
  type FormRenderingDataResponse,
  type ServerFormRenderingParams,
} from "src/domains/forms/forms-kit";
import { type UseAsyncStateReturn, useAsyncState } from "@vueuse/core";

export const useServerFormRenderingData = (
  parameters: ServerFormRenderingParams,
): UseAsyncStateReturn<FormRenderingDataResponse | undefined, [], true> => {
  return useAsyncState(
    FormDataService.getFormRenderingData(parameters).then((data) => data),
    undefined,
  );
};
