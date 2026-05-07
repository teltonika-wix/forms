import { FormCodes } from '../../types/formEnums';

export const isFormCode = (code: unknown): code is FormCodes => {
  const formCodes = Object.values(FormCodes) as (keyof typeof FormCodes)[];

  return formCodes.includes(code as FormCodes);
};
