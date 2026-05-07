import { type Mock, describe, expect, it, vi } from "vitest";
import { validateFormParams } from "../../../utils/validateFormParams";
import { extractFormSearchParams } from "../extractFormSearchParams";

vi.mock("../../../utils/validateFormParams", () => ({
  validateFormParams: vi.fn(),
}));

vi.mock("../../../formConstants", () => ({
  FORM_URL_PARAMETERS: ["language", "form"],
}));

const validateFormParamsMock = validateFormParams as Mock;
const formCodeMock = "ContactForm";

describe("extractFormSearchParams", () => {
  const mockUrl = new URL(`https://example.com?language=en&form=${formCodeMock}`);

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should extract and validate form search parameters from the URL", () => {
    const mockFormUrlParameters = {
      language: "en",
      form: formCodeMock,
    };

    const validParameters = { language: "en", form: formCodeMock };
    validateFormParamsMock.mockReturnValue(validParameters);

    const result = extractFormSearchParams({ url: mockUrl });

    expect(result).toEqual(validParameters);
    expect(validateFormParamsMock).toHaveBeenCalledWith(mockFormUrlParameters);
  });

  it("should return an empty object if no valid parameters are found", () => {
    const emptyUrl = new URL("https://example.com");
    validateFormParamsMock.mockReturnValue({});

    const result = extractFormSearchParams({ url: emptyUrl });

    expect(result).toEqual({});
    expect(validateFormParamsMock).toHaveBeenCalledWith({
      language: null,
      form: null,
    });
  });
});
