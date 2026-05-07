import { FORM_URL_PARAMETERS } from "src/domains/forms/forms-kit/formConstants";
import type { ExactFormUrlParameters } from "../../types/formGeneralTypes";
import { validateFormParams } from "../../utils/validateFormParams";

export type ExtractFormSearchParamsParams = { url: URL };

export const extractFormSearchParams = ({
  url,
}: ExtractFormSearchParamsParams): ExactFormUrlParameters => {
  const urlSearchParams = new URLSearchParams(url.search);

  const formUrlParameters = FORM_URL_PARAMETERS.reduce<Record<string, unknown>>(
    (collection, parameterName) => {
      collection[parameterName] = urlSearchParams.get(parameterName);

      return collection;
    },
    {},
  );

  const validParameters = validateFormParams(formUrlParameters);

  return validParameters;
};
