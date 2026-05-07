import type {
  BrowserFormRenderingParams,
  FormInputComponentData,
} from "src/domains/forms/forms-kit";

export type FormsGeneratorBaseProps = {
  recaptchaSiteKey: string;
  submitButtonText: string;
};

export type BrowserFormGeneralProps = BrowserFormRenderingParams & FormsGeneratorBaseProps;

export type BaseFormComponentProps = {
  formInputData: FormInputComponentData;
  formCode: string;
};
