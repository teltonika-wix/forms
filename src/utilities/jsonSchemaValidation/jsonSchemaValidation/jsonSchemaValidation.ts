import { type ValidationErrors, type ValidationSchema, validationAdapter } from '../validationAdapter';

export type ValidData<DataType> = { data: DataType; errors?: undefined; isDataValid: boolean };
export type InvalidData = { errors: ValidationErrors; data?: undefined; isDataValid: boolean };
export type JsonSchemaValidationReturn<DataType> = ValidData<DataType> | InvalidData;

export const jsonSchemaValidation = <DataType>(
  rawData: unknown,
  schema: ValidationSchema,
): JsonSchemaValidationReturn<DataType> => {
  const { errors, isValid, isDataValid } = validationAdapter<DataType>(rawData, schema);

  if (!isValid(rawData)) {
    return { errors, isDataValid };
  }

  return { data: rawData, isDataValid };
};
