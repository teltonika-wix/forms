import { isSuccessfulStatusCode } from "src/utilities";
import { type Mock, vi } from "vitest";
import type { FormRenderingDataResponse } from "../../../types/formDataTypes";
import { validateFormParams } from "../../../utils/validateFormParams";
import { createFullFormUrl } from "../createFullFormUrl";
import { getFormRenderingData } from "../getFormRenderingData";

vi.mock("src/utilities", () => ({
  isSuccessfulStatusCode: vi.fn(),
}));

vi.mock("../../../utils/validateFormParams", () => ({
  validateFormParams: vi.fn(),
}));

vi.mock("../createFullFormUrl", () => ({
  createFullFormUrl: vi.fn(),
}));

const validateFormParamsMock = validateFormParams as unknown as Mock;
const createFullFormUrlMock = createFullFormUrl as unknown as Mock;
const isSuccessfulStatusCodeMock = isSuccessfulStatusCode as unknown as Mock;

describe("getFormRenderingData", () => {
  const mockFormWebClientEndpoint = "/form-endpoint";
  const mockOrigin = "https://example.com";
  const mockFormCode = "ContactForm";
  const mockFormUrlParameters = { language: "en", form: mockFormCode };
  const mockFormUrl = `${mockOrigin}${mockFormWebClientEndpoint}?language=en&form=${mockFormCode}`;
  const mockResponseData = {
    field1: "data1",
    field2: "data2",
  } as unknown as FormRenderingDataResponse;

  globalThis.fetch = vi.fn();
  const fetchMock = globalThis.fetch as Mock;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should fetch form rendering data successfully", async () => {
    validateFormParamsMock.mockReturnValue(mockFormUrlParameters);
    createFullFormUrlMock.mockReturnValue(mockFormUrl);
    isSuccessfulStatusCodeMock.mockReturnValue(true);

    fetchMock.mockResolvedValue({
      status: 200,
      json: vi.fn().mockResolvedValue(mockResponseData),
    });

    const result = await getFormRenderingData({
      formWebClientEndpoint: mockFormWebClientEndpoint,
      formUrlParameters: mockFormUrlParameters,
    });

    expect(validateFormParamsMock).toHaveBeenCalledWith(mockFormUrlParameters);
    expect(createFullFormUrlMock).toHaveBeenCalledWith({
      searchParams: mockFormUrlParameters,
      formWebClientEndpoint: mockFormWebClientEndpoint,
    });
    expect(fetchMock).toHaveBeenCalledWith(mockFormUrl);
    expect(result).toEqual(mockResponseData);
  });

  it("should throw an error if the response status is not successful", async () => {
    validateFormParamsMock.mockReturnValue(mockFormUrlParameters);
    createFullFormUrlMock.mockReturnValue(mockFormUrl);
    isSuccessfulStatusCodeMock.mockReturnValue(false);

    fetchMock.mockResolvedValue({
      status: 500,
      json: vi.fn(),
    });

    await expect(
      getFormRenderingData({
        formUrlParameters: mockFormUrlParameters,
        formWebClientEndpoint: mockFormWebClientEndpoint,
      }),
    ).rejects.toThrow("Failed to fetch form structure");

    expect(fetchMock).toHaveBeenCalledWith(mockFormUrl);
  });

  it("should throw an error if response data is not provided", async () => {
    validateFormParamsMock.mockReturnValue(mockFormUrlParameters);
    createFullFormUrlMock.mockReturnValue(mockFormUrl);
    isSuccessfulStatusCodeMock.mockReturnValue(true);

    fetchMock.mockResolvedValue({
      status: 200,
      json: vi.fn().mockResolvedValue(null),
    });

    await expect(
      getFormRenderingData({
        formUrlParameters: mockFormUrlParameters,
        formWebClientEndpoint: mockFormWebClientEndpoint,
      }),
    ).rejects.toThrow(`Response data doesn't provided`);

    expect(fetchMock).toHaveBeenCalledWith(mockFormUrl);
  });
});
