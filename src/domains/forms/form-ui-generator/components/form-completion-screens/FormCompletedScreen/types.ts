import type { FormInputComponentData } from "src/domains/forms/forms-kit";

export type FormCompletedScreenProps = {
  formCode: string;
  formInputs: FormInputComponentData[];
};
