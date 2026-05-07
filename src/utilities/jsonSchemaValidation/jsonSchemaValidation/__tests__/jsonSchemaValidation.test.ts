import { type Mock, describe, expect, it, vi } from "vitest";
import { validationAdapter } from "../../validationAdapter";
import { jsonSchemaValidation } from "../jsonSchemaValidation";

vi.mock("../../validationAdapter", () => ({
  validationAdapter: vi.fn(),
}));

const validationAdapterMock = validationAdapter as unknown as Mock;

describe("jsonSchemaValidation", () => {
  const mockSchema = {
    type: "object",
    properties: {
      name: { type: "string" },
    },
    required: ["name"],
  };

  afterEach(() => {
    validationAdapterMock.mockReset();
  });

  it("should return valid data when validation passes", () => {
    const validData = { name: "John Doe" };

    validationAdapterMock.mockReturnValue({
      errors: [],
      isValid: () => true,
      isDataValid: true,
    });

    const result = jsonSchemaValidation(validData, mockSchema);

    expect(result).toEqual({
      data: validData,
      isDataValid: true,
    });
    expect(validationAdapterMock).toHaveBeenCalledWith(validData, mockSchema);
  });

  it("should return errors when validation fails", () => {
    const invalidData = { name: 123 };

    validationAdapterMock.mockReturnValue({
      errors: [
        { message: "Invalid type for property name", instancePath: "/name" },
      ],
      isValid: () => false,
      isDataValid: false,
    });

    const result = jsonSchemaValidation(invalidData, mockSchema);

    expect(result).toEqual({
      errors: [
        { message: "Invalid type for property name", instancePath: "/name" },
      ],
      isDataValid: false,
    });
    expect(validationAdapterMock).toHaveBeenCalledWith(invalidData, mockSchema);
  });

  it("should return errors for null data", () => {
    const nullData = null;

    validationAdapterMock.mockReturnValue({
      errors: [{ message: "Invalid data: null value", instancePath: "" }],
      isValid: () => false,
      isDataValid: false,
    });

    const result = jsonSchemaValidation(nullData, mockSchema);

    expect(result).toEqual({
      errors: [{ message: "Invalid data: null value", instancePath: "" }],
      isDataValid: false,
    });
    expect(validationAdapterMock).toHaveBeenCalledWith(nullData, mockSchema);
  });

  it("should return errors for undefined data", () => {
    const undefinedData = undefined;

    validationAdapterMock.mockReturnValue({
      errors: [{ message: "Invalid data: undefined value", instancePath: "" }],
      isValid: () => false,
      isDataValid: false,
    });

    const result = jsonSchemaValidation(undefinedData, mockSchema);

    expect(result).toEqual({
      errors: [{ message: "Invalid data: undefined value", instancePath: "" }],
      isDataValid: false,
    });
    expect(validationAdapterMock).toHaveBeenCalledWith(
      undefinedData,
      mockSchema,
    );
  });

  it("should return valid data when schema does not require validation", () => {
    const validData = { name: "John Doe" };
    const schemaWithoutRequiredFields = {
      type: "object",
      properties: {
        name: { type: "string" },
      },
    };

    validationAdapterMock.mockReturnValue({
      errors: [],
      isValid: () => true,
      isDataValid: true,
    });

    const result = jsonSchemaValidation(validData, schemaWithoutRequiredFields);

    expect(result).toEqual({
      data: validData,
      isDataValid: true,
    });
    expect(validationAdapterMock).toHaveBeenCalledWith(
      validData,
      schemaWithoutRequiredFields,
    );
  });
});
