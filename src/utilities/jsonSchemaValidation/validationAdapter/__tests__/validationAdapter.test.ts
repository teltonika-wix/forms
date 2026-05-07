import { Validator } from "@cfworker/json-schema";
import { type Mock, describe, expect, it, vi } from "vitest";
import {
  type ValidationReturn,
  type ValidationSchema,
  validationAdapter,
} from "../validationAdapter";

vi.mock("@cfworker/json-schema", () => ({
  Validator: vi.fn(),
}));

const ValidatorMock = Validator as unknown as Mock;

describe("validationAdapter", () => {
  const mockSchema: ValidationSchema = {
    id: "testSchema",
    $schema: "http://json-schema.org/draft-07/schema#",
    type: "object",
    properties: {
      name: { type: "string" },
    },
    required: ["name"],
  };

  afterEach(() => {
    ValidatorMock.mockReset();
  });

  it("should return valid results for valid data", () => {
    const mockData = { name: "John Doe" };

    ValidatorMock.mockImplementation(function () {
      return {
      validate: () => ({ valid: true, errors: [] }),
      };
    });

    const result: ValidationReturn<typeof mockData> = validationAdapter(
      mockData,
      mockSchema,
    );

    expect(result.isDataValid).toBe(true);
    expect(result.errors).toEqual([]);
    expect(result.isValid(mockData)).toBe(true);
    expect(ValidatorMock).toHaveBeenCalledWith(mockSchema, "7", false);
  });

  it("should return invalid results for invalid data", () => {
    const invalidData = { name: 123 };

    ValidatorMock.mockImplementation(function () {
      return {
      validate: () => ({
        valid: false,
        errors: [
          { message: "Invalid type for property name", instancePath: "/name" },
        ],
      }),
      };
    });

    const result = validationAdapter(invalidData, mockSchema);

    expect(result.isDataValid).toBe(false);
    expect(result.errors.length).toBe(1);
    expect(result.errors[0].message).toBe("Invalid type for property name");
    expect(result.isValid(invalidData)).toBe(false);
  });

  it("should return false for null data", () => {
    const nullData = null;

    ValidatorMock.mockImplementation(function () {
      return {
      validate: () => ({
        valid: false,
        errors: [{ message: "Invalid data: null value", instancePath: "" }],
      }),
      };
    });

    const result = validationAdapter(nullData, mockSchema);

    expect(result.isDataValid).toBe(false);
    expect(result.errors.length).toBe(1);
    expect(result.errors[0].message).toBe("Invalid data: null value");
    expect(result.isValid(nullData)).toBe(false);
  });

  it("should return false for undefined data", () => {
    const undefinedData = undefined;

    ValidatorMock.mockImplementation(function () {
      return {
      validate: () => ({
        valid: false,
        errors: [
          { message: "Invalid data: undefined value", instancePath: "" },
        ],
      }),
      };
    });

    const result = validationAdapter(undefinedData, mockSchema);

    expect(result.isDataValid).toBe(false);
    expect(result.errors.length).toBe(1);
    expect(result.errors[0].message).toBe("Invalid data: undefined value");
    expect(result.isValid(undefinedData)).toBe(false);
  });

  it("should handle schema validation errors", () => {
    const validData = { name: "John Doe" };

    ValidatorMock.mockImplementation(function () {
      return {
        validate: () => {
          throw new Error("Schema validation failed");
        },
      };
    });

    expect(() => validationAdapter(validData, mockSchema)).toThrow("Schema validation failed");
  });
});
