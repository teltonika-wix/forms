import type { FormInputComponentData } from "src/domains/forms/forms-kit";
import { useFormStore } from "../../../stores/formStore";

export type AddFormInputsToStoreParams = {
  formCode: string;
  formInputs: FormInputComponentData[];
};

export const addFormInputsToStore = ({
  formCode,
  formInputs,
}: AddFormInputsToStoreParams): void => {
  if (!formInputs.length) {
    return;
  }

  const { addFormInput } = useFormStore(formCode);

  formInputs.forEach((formInputData) => {
    if (!formInputData?.attributes?.name) {
      return;
    }

    const { name } = formInputData.attributes;

    addFormInput(name, formInputData?.defaultValue);
  });
};
