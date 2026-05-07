import { createUrlWithParams, extractErrorMessage } from "src/utilities";
import { type Mock, vi } from "vitest";
import type { ExactFormUrlParameters, FormSecrets } from "../../../types/formGeneralTypes";
import { generateFormUrl } from "../generateFormUrl";

vi.mock("src/utilities", () => ({
  createUrlWithParams: vi.fn(),
  extractErrorMessage: vi.fn(),
}));

const createUrlWithParamsMock = createUrlWithParams as Mock;
const extractErrorMessageMock = extractErrorMessage as Mock;

describe("generateFormUrl", () => {
  const mockFormMicroserviceUrl = "https://form-service.com";
  const mockFormMicroserviceToken = "secret-token";
  const mockFormCode = "ContactForm";
  const mockFormUrlParameters = { language: "en", form: mockFormCode } as ExactFormUrlParameters;
  const mockEndpoint = "/submit";
  const mockFormSecrets: FormSecrets = {
    formMicroserviceUrl: mockFormMicroserviceUrl,
    formMicroserviceToken: mockFormMicroserviceToken,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should generate a form URL with the provided parameters", async () => {
    const expectedUrl = `${mockFormMicroserviceUrl}${mockEndpoint}?language=en&form=${mockFormCode}&token=${mockFormMicroserviceToken}`;
    createUrlWithParamsMock.mockReturnValue(expectedUrl);

    const result = await generateFormUrl({
      formUrlParameters: mockFormUrlParameters,
      endpoint: mockEndpoint,
      formSecrets: mockFormSecrets,
    });

    expect(createUrlWithParamsMock).toHaveBeenCalledWith({
      baseUrl: mockFormMicroserviceUrl,
      endpoint: mockEndpoint,
      searchParams: {
        ...mockFormUrlParameters,
        token: mockFormMicroserviceToken,
      },
    });
    expect(result).toBe(expectedUrl);
  });

  it("should throw an error when createUrlWithParams fails", async () => {
    const mockError = new Error("URL generation error");
    createUrlWithParamsMock.mockImplementation(() => {
      throw mockError;
    });
    extractErrorMessageMock.mockReturnValue("Error occurred");

    await expect(
      generateFormUrl({
        formUrlParameters: mockFormUrlParameters,
        endpoint: mockEndpoint,
        formSecrets: mockFormSecrets,
      }),
    ).rejects.toThrow("Failed to generate form url: Error occurred");

    expect(extractErrorMessageMock).toHaveBeenCalledWith(mockError);
  });
});
