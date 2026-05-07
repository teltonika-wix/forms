import type {
  BrowserFormRenderingParams,
  FormRenderingDataResponse,
} from "src/domains/forms/forms-kit";

export type FormProps = BrowserFormRenderingParams & {
  recaptchaSiteKey: string;
  formRenderingData: FormRenderingDataResponse;
  clientFullUrl: string;
  submitButtonText: string;
};
