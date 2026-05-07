import type { FormSecretsParameter } from "../types";

export type ClientIp = string;
export type BaseFormApiParams = FormSecretsParameter & {
  url: URL;
  clientIp: ClientIp;
};
