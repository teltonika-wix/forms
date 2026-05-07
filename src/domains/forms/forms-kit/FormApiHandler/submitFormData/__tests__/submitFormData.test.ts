import {
  createBadResponse,
  extractErrorMessage,
} from "src/utilities";
import { type Mock, vi } from "vitest";
import { FormDataService } from "../../../FormDataService";
import { FormUrl } from "../../FormUrl";
import { formatFormData } from "../formatFormData";
import { submitFormData } from "../submitFormData";

vi.mock("src/utilities", () => ({
  createBadResponse: vi.fn(),
  extractErrorMessage: vi.fn(),
}));

vi.mock("../../../FormDataService", () => ({
  FormDataService: {
    sendFormData: vi.fn(),
  },
}));

vi.mock("../../FormUrl", () => ({
  FormUrl: {
    extractFormSearchParams: vi.fn(),
  },
}));

vi.mock("../formatFormData", () => ({
  formatFormData: vi.fn(),
}));

const createBadResponseMock = createBadResponse as Mock;
const extractErrorMessageMock = extractErrorMessage as Mock;
const sendFormDataMock = FormDataService.sendFormData as Mock;
const extractFormSearchParamsMock = FormUrl.extractFormSearchParams as Mock;
const formatFormDataMock = formatFormData as Mock;

describe("submitFormData", () => {
  const mockFormCode = "ContactForm"; // Extracted constant
  const mockUrl = new URL(
    `https://example.com?language=en&form=${mockFormCode}`,
  );
  const mockClientIp = "127.0.0.1";
  const mockFormSecrets = {
    formMicroserviceUrl: "https://form-service.com",
    formMicroserviceToken: "secret-token",
  };
  const mockFormData = new FormData();
  const mockFormUrlParams = { language: "en", form: mockFormCode };

  beforeEach(() => {
    vi.clearAllMocks();
    extractFormSearchParamsMock.mockReturnValue(mockFormUrlParams);
  });

  it("should submit the form data successfully", async () => {
    const mockFormattedFormData = new FormData();
    formatFormDataMock.mockResolvedValue({
      formattedFormData: mockFormattedFormData,
      errorMessage: "",
    });
    const mockResponse = new Response("Success", { status: 200 });
    sendFormDataMock.mockResolvedValue(mockResponse);

    const result = await submitFormData({
      url: mockUrl,
      clientIp: mockClientIp,
      formSecrets: mockFormSecrets,
      formData: mockFormData,
    });

    expect(extractFormSearchParamsMock).toHaveBeenCalledWith({ url: mockUrl });
    expect(formatFormDataMock).toHaveBeenCalledWith({
      formData: mockFormData,
      clientIp: mockClientIp,
    });
    expect(sendFormDataMock).toHaveBeenCalledWith({
      formData: mockFormattedFormData,
      formUrlParameters: mockFormUrlParams,
      formSecrets: mockFormSecrets,
    });
    expect(result).toEqual(mockResponse);
  });

  it("should return a bad response if formattedFormData is not available", async () => {
    const mockBadResponse = new Response("Bad response", { status: 400 });
    formatFormDataMock.mockResolvedValue({
      formattedFormData: null,
      errorMessage: "Invalid data",
    });
    createBadResponseMock.mockReturnValue(mockBadResponse);

    const result = await submitFormData({
      url: mockUrl,
      clientIp: mockClientIp,
      formSecrets: mockFormSecrets,
      formData: mockFormData,
    });

    expect(createBadResponseMock).toHaveBeenCalledWith({
      errorMessage: "Invalid data",
    });
    expect(result).toEqual(mockBadResponse);
  });

  it("should handle errors and return a bad response", async () => {
    const mockError = new Error("Network error");
    const mockBadResponse = new Response("Bad response", { status: 500 });
    formatFormDataMock.mockRejectedValue(mockError);
    extractErrorMessageMock.mockReturnValue("Failed to send form data.");
    createBadResponseMock.mockReturnValue(mockBadResponse);

    const result = await submitFormData({
      url: mockUrl,
      clientIp: mockClientIp,
      formSecrets: mockFormSecrets,
      formData: mockFormData,
    });

    expect(extractErrorMessageMock).toHaveBeenCalledWith(mockError);
    expect(createBadResponseMock).toHaveBeenCalledWith({
      errorMessage: "Failed to send form data.",
    });
    expect(result).toEqual(mockBadResponse);
  });
});
