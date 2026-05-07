import type { ClientIp } from '../FormApiHandler';
import type { FormWebClientParams } from '../FormClients/FormWebClient';
import type { FormSecretsParameter, FormUrlParameters } from './formGeneralTypes';

export type ServerFormRenderingParams = FormSecretsParameter & {
  clientIp?: ClientIp;
  formUrlParameters: FormUrlParameters;
};

export type BrowserFormRenderingParams = FormWebClientParams;

export type SendFormDataBaseParams = {
  formData: FormData;
  formUrlParameters: FormUrlParameters;
};
export type SendServerFormDataParams = SendFormDataBaseParams & FormSecretsParameter;
export type SendBrowserFormDataParams = SendFormDataBaseParams & FormWebClientParams;
