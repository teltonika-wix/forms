import { FormCodes } from "../../../types/formEnums";
import { isFormCode } from "../isFormCode";

describe("isFormCode", () => {
  it("should return true for a valid FormCodes value", () => {
    const validCode = FormCodes.ContactForm; // Replace Code1 with an actual valid code from your FormCodes enum
    const result = isFormCode(validCode);
    expect(result).toBe(true);
  });

  it("should return false for an invalid FormCodes value", () => {
    const invalidCode = "INVALID_CODE"; // Replace with an invalid code not in FormCodes
    const result = isFormCode(invalidCode);
    expect(result).toBe(false);
  });

  it("should return false for non-string values", () => {
    const nonStringValues = [123, {}, [], null, undefined];

    nonStringValues.forEach((value) => {
      const result = isFormCode(value);
      expect(result).toBe(false);
    });
  });

  it("should return false for empty string", () => {
    const result = isFormCode("");
    expect(result).toBe(false);
  });
});
