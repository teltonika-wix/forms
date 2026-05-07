import { isString } from "src/utilities";
import { type Mock, vi } from "vitest";
import { isFormCode } from "../../isFormCode";
import { validateFormParams } from "../validateFormParams";

vi.mock("src/utilities", () => ({
  isString: vi.fn(),
}));

vi.mock("../../isFormCode", () => ({
  isFormCode: vi.fn(),
}));

const isStringMock = isString as unknown as Mock;
const isFormCodeMock = isFormCode as unknown as Mock;

describe("validateFormParams", () => {
  const mockFormUrlParameters = { form: "ContactForm", language: "en" };
  const validFormCode = "ContactForm";

  beforeEach(() => {
    vi.clearAllMocks();
    isFormCodeMock.mockImplementation((code) => code === validFormCode);
    isStringMock.mockImplementation((value) => typeof value === "string");
  });

  it("should return ExactFormUrlParameters for valid parameters", () => {
    const result = validateFormParams(mockFormUrlParameters);
    expect(result).toEqual(mockFormUrlParameters);
  });

  it("should throw an error if formUrlParameters are not provided", () => {
    expect(() =>
      validateFormParams(undefined as unknown as Parameters<typeof validateFormParams>[0]),
    ).toThrow("Form url parameters not provided");
  });

  it("should throw an error if one of the form parameters is invalid", () => {
    const invalidParameters = { ...mockFormUrlParameters, language: null };
    expect(() => validateFormParams(invalidParameters)).toThrow(
      "One of form parameter is invalid: language",
    );
  });

  it("should throw an error if form code is invalid", () => {
    const invalidFormParameters = { ...mockFormUrlParameters, form: "invalidFormCode" };
    expect(() => validateFormParams(invalidFormParameters)).toThrow(
      "Form code not allowed: invalidFormCode",
    );
  });

  it("should throw an error if language is not 2 characters", () => {
    const invalidLanguageParameters = { ...mockFormUrlParameters, language: "eng" };
    expect(() => validateFormParams(invalidLanguageParameters)).toThrow(
      "Form language not allowed: eng",
    );
  });
});
