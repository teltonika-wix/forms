import { type Mock, vi } from "vitest";
import { FormServerClient } from "../../FormClients/FormServerClient";
import { FormWebClient } from "../../FormClients/FormWebClient";
import type { FormSecrets } from "../../types";
import { sendFormData } from "../sendFormData";

vi.mock("../../FormClients/FormServerClient", () => ({
  FormServerClient: {
    sendFormData: vi.fn(),
  },
}));

vi.mock("../../FormClients/FormWebClient", () => ({
  FormWebClient: {
    sendFormData: vi.fn(),
  },
}));

const sendFormDataMock = FormServerClient.sendFormData as unknown as Mock;
const sendBrowserFormDataMock = FormWebClient.sendFormData as unknown as Mock;

describe("sendFormData", () => {
  const mockFormMicroserviceUrl = "https://form-service.com";
  const mockFormMicroserviceToken = "secret-token";
  const mockFormCode = "ContactForm";
  const mockFormSecrets: FormSecrets = {
    formMicroserviceUrl: mockFormMicroserviceUrl,
    formMicroserviceToken: mockFormMicroserviceToken,
  };
  const mockFormUrlParameters = { language: "en", form: mockFormCode };
  const mockFormWebClientEndpoint = "/form-endpoint";
  const mockFormData = new FormData();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should send form data on the browser side", async () => {
    const mockResponse = new Response(JSON.stringify({ success: true }), { status: 200 });
    sendBrowserFormDataMock.mockResolvedValue(mockResponse);
    globalThis.window = {} as unknown as Window & typeof globalThis;

    const result = await sendFormData({
      formData: mockFormData,
      formUrlParameters: mockFormUrlParameters,
      formWebClientEndpoint: mockFormWebClientEndpoint,
    });

    expect(sendBrowserFormDataMock).toHaveBeenCalledWith({
      formData: mockFormData,
      formUrlParameters: mockFormUrlParameters,
      formWebClientEndpoint: mockFormWebClientEndpoint,
    });
    expect(result).toEqual(mockResponse);
  });

  it("should throw an error if formWebClientEndpoint is not provided in the browser", async () => {
    const sendFormDataParams = {
      formData: mockFormData,
      formUrlParameters: mockFormUrlParameters,
      formWebClientEndpoint: "",
    };

    await expect(sendFormData(sendFormDataParams)).rejects.toThrow(
      "To send form data on the browser side, the form api endpoint must be provided.",
    );
  });

  it("should send form data on the server side", async () => {
    const mockResponse = new Response(JSON.stringify({ success: true }), { status: 200 });
    sendFormDataMock.mockResolvedValue(mockResponse);
    globalThis.window = undefined as unknown as Window & typeof globalThis;

    const result = await sendFormData({
      formData: mockFormData,
      formUrlParameters: mockFormUrlParameters,
      formSecrets: mockFormSecrets,
    });

    expect(sendFormDataMock).toHaveBeenCalledWith({
      formData: mockFormData,
      formUrlParameters: mockFormUrlParameters,
      formSecrets: mockFormSecrets,
    });
    expect(result).toEqual(mockResponse);
  });

  it("should throw an error if formSecrets are not provided in the server", async () => {
    const sendFormDataParams = {
      formData: mockFormData,
      formUrlParameters: mockFormUrlParameters,
      formSecrets: undefined as unknown as FormSecrets,
    };

    await expect(sendFormData(sendFormDataParams)).rejects.toThrow(
      "To fetch form data on the server side, the form secrets must be provided.",
    );
  });
});
