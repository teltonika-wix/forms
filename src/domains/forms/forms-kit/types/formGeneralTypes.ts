import type { OverrideObject } from "src/utilities";
import type { FormUrlParameterKey } from "../formConstants";
import type { FormCodes } from "./formEnums";

export type FormUrlParameters = { [key in FormUrlParameterKey]: string };
export type ExactFormUrlParameters = OverrideObject<
  FormUrlParameters,
  { form: FormCodes }
>;

export type FormSecrets = {
  formMicroserviceUrl: string;
  formMicroserviceToken: string;
};

export type FormSecretsParameter = {
  formSecrets: FormSecrets;
};
