import type { FormUrlParameters } from "../../types";

export type FormWebClientParams = {
  formUrlParameters: FormUrlParameters;
  formWebClientEndpoint: string;
  prefills?: Record<string, string>;
  isDev?: boolean;
};
