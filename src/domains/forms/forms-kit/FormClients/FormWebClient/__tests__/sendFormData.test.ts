import { createBadResponse, extractErrorMessage } from "src/utilities";
import { type Mock, vi } from "vitest";
import { validateFormParams } from "../../../utils/validateFormParams";
import { createFullFormUrl } from "../createFullFormUrl";
import { sendFormData } from "../sendFormData";

vi.mock("src/utilities", () => ({
  createBadResponse: vi.fn(),
  extractErrorMessage: vi.fn(),
}));

vi.mock("../../../utils/validateFormParams", () => ({
  validateFormParams: vi.fn(),
}));

vi.mock("../createFullFormUrl", () => ({
  createFullFormUrl: vi.fn(),
}));

const validateFormParamsMock = validateFormParams as unknown as Mock;
const createFullFormUrlMock = createFullFormUrl as unknown as Mock;
const createBadResponseMock = createBadResponse as unknown as Mock;
const extractErrorMessageMock = extractErrorMessage as unknown as Mock;

describe("sendFormData", () => {
  const mockFormWebClientEndpoint = "/form-endpoint";
  const mockOrigin = "https://example.com";
  const mockFormCode = "ContactForm";
  const mockFormUrlParameters = { language: "en", form: mockFormCode };
  const mockFormData = new FormData();
  const mockFullUrl = `${mockOrigin}${mockFormWebClientEndpoint}/submit?language=en&form=${mockFormCode}`;

  globalThis.fetch = vi.fn();
  const fetchMock = globalThis.fetch as Mock;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should send form data successfully", async () => {
    validateFormParamsMock.mockReturnValue(mockFormUrlParameters);
    createFullFormUrlMock.mockReturnValue(mockFullUrl);

    fetchMock.mockResolvedValue({
      status: 200,
      json: vi.fn().mockResolvedValue({ success: true }),
    });

    const result = await sendFormData({
      formData: mockFormData,
      formUrlParameters: mockFormUrlParameters,
      formWebClientEndpoint: mockFormWebClientEndpoint,
    });

    expect(validateFormParamsMock).toHaveBeenCalledWith(mockFormUrlParameters);
    expect(createFullFormUrlMock).toHaveBeenCalledWith({
      endpoint: "/submit",
      searchParams: mockFormUrlParameters,
      formWebClientEndpoint: mockFormWebClientEndpoint,
    });
    expect(fetchMock).toHaveBeenCalledWith(mockFullUrl, {
      method: "POST",
      body: mockFormData,
    });
    expect(result).toEqual({
      status: 200,
      json: expect.any(Function),
    });
  });

  it("should return a bad response if form validation fails", async () => {
    const mockErrorMessage = "Validation error";
    validateFormParamsMock.mockImplementation(() => {
      throw new Error(mockErrorMessage);
    });
    extractErrorMessageMock.mockReturnValue(mockErrorMessage);

    const result = await sendFormData({
      formData: mockFormData,
      formUrlParameters: mockFormUrlParameters,
      formWebClientEndpoint: mockFormWebClientEndpoint,
    });

    expect(createBadResponseMock).toHaveBeenCalledWith({ errorMessage: mockErrorMessage });
    expect(result).toEqual(createBadResponseMock());
  });

  it("should return a bad response if the fetch fails", async () => {
    const mockFetchError = new Error("Fetch error");
    validateFormParamsMock.mockReturnValue(mockFormUrlParameters);
    createFullFormUrlMock.mockReturnValue(mockFullUrl);
    fetchMock.mockRejectedValue(mockFetchError);
    extractErrorMessageMock.mockReturnValue("Fetch error occurred");

    const result = await sendFormData({
      formData: mockFormData,
      formUrlParameters: mockFormUrlParameters,
      formWebClientEndpoint: mockFormWebClientEndpoint,
    });

    expect(createBadResponseMock).toHaveBeenCalledWith({ errorMessage: "Fetch error occurred" });
    expect(result).toEqual(createBadResponseMock());
  });

  it("should pass abort signal to fetch when provided", async () => {
    const abortController = new AbortController();

    validateFormParamsMock.mockReturnValue(mockFormUrlParameters);
    createFullFormUrlMock.mockReturnValue(mockFullUrl);
    fetchMock.mockResolvedValue({
      status: 200,
      json: vi.fn().mockResolvedValue({ success: true }),
    });

    await sendFormData({
      formData: mockFormData,
      formUrlParameters: mockFormUrlParameters,
      formWebClientEndpoint: mockFormWebClientEndpoint,
      signal: abortController.signal,
    });

    expect(fetchMock).toHaveBeenCalledWith(mockFullUrl, {
      method: "POST",
      body: mockFormData,
      signal: abortController.signal,
    });
  });

  it("should rethrow abort errors", async () => {
    const abortError = new Error("request was aborted");
    abortError.name = "AbortError";

    validateFormParamsMock.mockReturnValue(mockFormUrlParameters);
    createFullFormUrlMock.mockReturnValue(mockFullUrl);
    fetchMock.mockRejectedValue(abortError);

    await expect(
      sendFormData({
        formData: mockFormData,
        formUrlParameters: mockFormUrlParameters,
        formWebClientEndpoint: mockFormWebClientEndpoint,
      }),
    ).rejects.toThrow("request was aborted");

    expect(createBadResponseMock).not.toHaveBeenCalled();
  });
});
