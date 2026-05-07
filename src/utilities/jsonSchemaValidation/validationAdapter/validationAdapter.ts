import { type OutputUnit, Validator } from '@cfworker/json-schema';

export type ValidationErrors = OutputUnit[];
export type ValidationSchema = {
  id?: string;
  $id?: string;
  $schema?: string;
  $async?: false;
  [x: string]: unknown;
};
export type ValidationReturn<DataType> = {
  isDataValid: boolean;
  errors: OutputUnit[];
  isValid: (data: unknown) => data is DataType;
};

export const validationAdapter = <DataType>(rawData: unknown, schema: ValidationSchema): ValidationReturn<DataType> => {
  const validator = new Validator(schema, '7', false);

  const { valid: isDataValid, errors } = validator.validate(rawData);

  return {
    isDataValid,
    errors,
    isValid: (routeContentData: unknown): routeContentData is DataType => {
      return routeContentData ? isDataValid : false;
    },
  };
};
