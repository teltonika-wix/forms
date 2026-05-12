import { isSuccessfulStatusCode } from "src/utilities";
import { type Mock, vi } from "vitest";
import type { FormSecrets, FormUrlParameters } from "../../../types/formGeneralTypes";
import { validateFormParams } from "../../../utils/validateFormParams";
import { generateFormUrl } from "../generateFormUrl";
import { getFormRenderingData } from "../getFormRenderingData";

vi.mock("src/utilities", () => ({
  isSuccessfulStatusCode: vi.fn(),
}));

vi.mock("../../../utils/validateFormParams", () => ({
  validateFormParams: vi.fn(),
}));

vi.mock("../generateFormUrl", () => ({
  generateFormUrl: vi.fn(),
}));

const generateFormUrlMock = generateFormUrl as unknown as Mock;
const validateFormParamsMock = validateFormParams as unknown as Mock;
const isSuccessfulStatusCodeMock = isSuccessfulStatusCode as unknown as Mock;

describe("getFormRenderingData", () => {
  const mockFormMicroserviceUrl = "https://form-service.com";
  const mockEndpoint = "/form";
  const mockFormMicroserviceToken = "secret-token";
  const mockFormSecrets: FormSecrets = {
    formMicroserviceUrl: mockFormMicroserviceUrl,
    formMicroserviceToken: mockFormMicroserviceToken,
  };
  const mockFormCode = "ContactForm";
  const mockFormUrlParameters: FormUrlParameters = { language: "en", form: mockFormCode };
  const mockFormUrl = `${mockFormMicroserviceUrl}${mockEndpoint}?language=en&form=${mockFormCode}&token=${mockFormMicroserviceToken}`;
  const mockResponseData = { code: mockFormCode, inputs: [] };

  globalThis.fetch = vi.fn();
  const fetchMock = globalThis.fetch as Mock;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should fetch form rendering data successfully", async () => {
    validateFormParamsMock.mockReturnValue(mockFormUrlParameters);
    generateFormUrlMock.mockResolvedValue(mockFormUrl);
    isSuccessfulStatusCodeMock.mockReturnValue(true);

    fetchMock.mockResolvedValue({
      status: 200,
      json: vi.fn().mockResolvedValue({ data: mockResponseData }),
    });

    const result = await getFormRenderingData({
      formUrlParameters: mockFormUrlParameters,
      formSecrets: mockFormSecrets,
    });

    expect(validateFormParamsMock).toHaveBeenCalledWith(mockFormUrlParameters);
    expect(generateFormUrl).toHaveBeenCalledWith({
      formUrlParameters: mockFormUrlParameters,
      endpoint: mockEndpoint,
      formSecrets: mockFormSecrets,
    });
    expect(fetchMock).toHaveBeenCalledWith(mockFormUrl);
    expect(result).toEqual(mockResponseData);
  });

  it("should return response when code property is provided", async () => {
    validateFormParamsMock.mockReturnValue(mockFormUrlParameters);
    generateFormUrlMock.mockResolvedValue(mockFormUrl);
    isSuccessfulStatusCodeMock.mockReturnValue(true);

    fetchMock.mockResolvedValue({
      status: 200,
      json: vi.fn().mockResolvedValue(mockResponseData),
    });

    const result = await getFormRenderingData({
      formUrlParameters: mockFormUrlParameters,
      formSecrets: mockFormSecrets,
    });

    expect(result).toEqual(mockResponseData);
  });

  it("should throw an error if the response status is not successful", async () => {
    validateFormParamsMock.mockReturnValue(mockFormUrlParameters);
    generateFormUrlMock.mockResolvedValue(mockFormUrl);
    fetchMock.mockResolvedValue({
      status: 500,
      json: vi.fn(),
    });
    isSuccessfulStatusCodeMock.mockReturnValue(false);

    await expect(
      getFormRenderingData({
        formUrlParameters: mockFormUrlParameters,
        formSecrets: mockFormSecrets,
      }),
    ).rejects.toThrow("Failed to fetch form structure");

    expect(fetchMock).toHaveBeenCalledWith(mockFormUrl);
  });

  it("should throw an error if response data is not provided", async () => {
    validateFormParamsMock.mockReturnValue(mockFormUrlParameters);
    generateFormUrlMock.mockResolvedValue(mockFormUrl);
    isSuccessfulStatusCodeMock.mockReturnValue(true);

    fetchMock.mockResolvedValue({
      status: 200,
      json: vi.fn().mockResolvedValue({}),
    });

    await expect(
      getFormRenderingData({
        formUrlParameters: mockFormUrlParameters,
        formSecrets: mockFormSecrets,
      }),
    ).rejects.toThrow(`Response data doesn't provided`);

    expect(fetchMock).toHaveBeenCalledWith(mockFormUrl);
  });
});
