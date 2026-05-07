import { createBadResponse, extractErrorMessage } from "src/utilities";
import { type Mock, vi } from "vitest";
import { FormDataService } from "../../../FormDataService";
import type { FormSecrets, FormUrlParameters } from "../../../types";
import { FormUrl } from "../../FormUrl";
import { getFormStructure } from "../getFormStructure";

vi.mock("src/utilities", () => ({
  createBadResponse: vi.fn(),
  extractErrorMessage: vi.fn(),
}));

vi.mock("../../../FormDataService", () => ({
  FormDataService: {
    getFormRenderingData: vi.fn(),
  },
}));

vi.mock("../../FormUrl", () => ({
  FormUrl: {
    extractFormSearchParams: vi.fn(),
  },
}));

const createBadResponseMock = createBadResponse as Mock;
const extractErrorMessageMock = extractErrorMessage as Mock;
const getFormRenderingDataMock = FormDataService.getFormRenderingData as Mock;
const extractFormSearchParamsMock = FormUrl.extractFormSearchParams as Mock;

describe("getFormStructure", () => {
  const mockFormCode = "ContactForm";
  const mockUrl = new URL(`https://example.com?language=en&form=${mockFormCode}`);
  const mockClientIp = "127.0.0.1";
  const mockFormSecrets: FormSecrets = {
    formMicroserviceUrl: "https://form-service.com",
    formMicroserviceToken: "secret-token",
  };
  const mockFormUrlParams: FormUrlParameters = {
    language: "en",
    form: mockFormCode,
  };

  beforeEach(() => {
    vi.clearAllMocks();
    extractFormSearchParamsMock.mockReturnValue(mockFormUrlParams);
  });

  it("should return form rendering data as response when data is provided", async () => {
    const mockFormRenderingData = { field1: "data1" };
    getFormRenderingDataMock.mockResolvedValue(mockFormRenderingData);

    const result = await getFormStructure({
      url: mockUrl,
      clientIp: mockClientIp,
      formSecrets: mockFormSecrets,
    });

    expect(extractFormSearchParamsMock).toHaveBeenCalledWith({ url: mockUrl });
    expect(getFormRenderingDataMock).toHaveBeenCalledWith({
      formUrlParameters: mockFormUrlParams,
      clientIp: mockClientIp,
      formSecrets: mockFormSecrets,
    });
    expect(await result.json()).toEqual(mockFormRenderingData);
  });

  it("should return a bad response when form rendering data is not provided", async () => {
    const mockBadResponse = new Response("Bad response", { status: 400 });
    getFormRenderingDataMock.mockResolvedValue(null);
    createBadResponseMock.mockReturnValue(mockBadResponse);

    const result = await getFormStructure({
      url: mockUrl,
      clientIp: mockClientIp,
      formSecrets: mockFormSecrets,
    });

    expect(result).toEqual(mockBadResponse);
    expect(createBadResponseMock).toHaveBeenCalledWith({
      errorMessage: "Form rendering data does not provided",
    });
  });

  it("should return a bad response when an error occurs", async () => {
    const mockBadResponse = new Response("Bad response", { status: 500 });
    const mockError = new Error("Network error");
    getFormRenderingDataMock.mockRejectedValue(mockError);
    extractErrorMessageMock.mockReturnValue("Error occurred");
    createBadResponseMock.mockReturnValue(mockBadResponse);

    const result = await getFormStructure({
      url: mockUrl,
      clientIp: mockClientIp,
      formSecrets: mockFormSecrets,
    });

    expect(result).toEqual(mockBadResponse);
    expect(extractErrorMessageMock).toHaveBeenCalledWith(mockError);
    expect(createBadResponseMock).toHaveBeenCalledWith({
      errorMessage: "Error occurred",
    });
  });
});
