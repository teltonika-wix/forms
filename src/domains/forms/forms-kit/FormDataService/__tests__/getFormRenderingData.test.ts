import { type Mock, vi } from "vitest";
import { FormServerClient } from "../../FormClients/FormServerClient";
import { FormWebClient } from "../../FormClients/FormWebClient";
import type { FormSecrets } from "../../types";
import type { ServerFormRenderingParams } from "../../types/formInputParams";
import { addDefaultLocation } from "../defaultValues/addDefaultLocation";
import { getFormRenderingData } from "../getFormRenderingData";
import { type IPAddressInfo, getIpInfo } from "../ipInfo";

vi.mock("../../FormClients/FormServerClient", () => ({
  FormServerClient: {
    getFormRenderingData: vi.fn(),
  },
}));

vi.mock("../../FormClients/FormWebClient", () => ({
  FormWebClient: {
    getFormRenderingData: vi.fn(),
  },
}));

vi.mock("../ipInfo", () => ({
  getIpInfo: vi.fn(),
}));

vi.mock("../defaultValues/addDefaultLocation", () => ({
  addDefaultLocation: vi.fn(),
}));

const getServerFormRenderingDataMock = FormServerClient.getFormRenderingData as unknown as Mock;
const getBrowserFormRenderingDataMock = FormWebClient.getFormRenderingData as unknown as Mock;
const getIpInfoMock = getIpInfo as unknown as Mock;
const addDefaultLocationMock = addDefaultLocation as unknown as Mock;

const createFormRenderingData = (): { inputs: never[] } => ({ inputs: [] });

describe("getFormRenderingData", () => {
  const mockFormMicroserviceUrl = "https://form-service.com";
  const mockFormMicroserviceToken = "secret-token";
  const mockFormCode = "ContactForm";
  const mockFormSecrets: FormSecrets = {
    formMicroserviceUrl: mockFormMicroserviceUrl,
    formMicroserviceToken: mockFormMicroserviceToken,
  };
  const mockFormUrlParameters = { language: "en", form: mockFormCode };
  const mockFormWebClientEndpoint = "/form-endpoint";

  const mockClientIp = "192.168.1.1";
  const mockServerParams: ServerFormRenderingParams = {
    formSecrets: mockFormSecrets,
    formUrlParameters: mockFormUrlParameters,
    clientIp: mockClientIp,
  };

  const mockIpInfo: IPAddressInfo = {
    bogon: false,
    countryCode: "US",
    countryName: "United States",
    ip: mockClientIp,
    loc: "37.7749,-122.4194",
    region: "California",
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should fetch form rendering data on the browser side", async () => {
    getBrowserFormRenderingDataMock.mockResolvedValue(createFormRenderingData());
    globalThis.window = {} as unknown as Window & typeof globalThis;

    const result = await getFormRenderingData({
      formUrlParameters: mockFormUrlParameters,
      formWebClientEndpoint: mockFormWebClientEndpoint,
    });

    expect(getBrowserFormRenderingDataMock).toHaveBeenCalledWith({
      formUrlParameters: mockFormUrlParameters,
      formWebClientEndpoint: mockFormWebClientEndpoint,
    });
    expect(result).toEqual(createFormRenderingData());
  });

  it("should throw an error if formWebClientEndpoint is not provided in the browser", async () => {
    const getFormRenderingDataParams = {
      formUrlParameters: mockFormUrlParameters,
      formWebClientEndpoint: "",
    };

    await expect(getFormRenderingData(getFormRenderingDataParams)).rejects.toThrow(
      "To fetch form data on the browser side, the form api endpoint must be provided.",
    );

    globalThis.window = undefined as unknown as Window & typeof globalThis;
  });

  it("should fetch form rendering data on the server side and add default location", async () => {
    const formRenderingDataWithLocations = { inputs: [{ defaultValue: "defaultValue" }] };
    getServerFormRenderingDataMock.mockResolvedValue(createFormRenderingData());
    getIpInfoMock.mockResolvedValue(mockIpInfo);
    addDefaultLocationMock.mockReturnValue(formRenderingDataWithLocations.inputs);

    const result = await getFormRenderingData(mockServerParams);

    expect(getServerFormRenderingDataMock).toHaveBeenCalledWith({
      formUrlParameters: mockFormUrlParameters,
      formSecrets: mockFormSecrets,
    });
    expect(getIpInfoMock).toHaveBeenCalledWith({
      clientIp: mockClientIp,
      formSecrets: mockFormSecrets,
    });
    expect(addDefaultLocationMock).toHaveBeenCalledWith({
      formInputComponents: createFormRenderingData().inputs,
      ipInfo: mockIpInfo,
    });
    expect(result).toEqual(formRenderingDataWithLocations);
  });

  it("should throw an error if formSecrets are not provided in the server", async () => {
    const getFormRenderingDataParams = {
      formSecrets: undefined as unknown as FormSecrets,
      formUrlParameters: mockFormUrlParameters,
      clientIp: mockClientIp,
    };

    await expect(getFormRenderingData(getFormRenderingDataParams)).rejects.toThrow(
      "To fetch form data on the server side, the form secrets must be provided.",
    );
  });

  it("should return form rendering data without adding default location if ipInfo is null", async () => {
    const formRenderingDataMock = createFormRenderingData();
    getServerFormRenderingDataMock.mockResolvedValue(formRenderingDataMock);
    getIpInfoMock.mockResolvedValue(null);

    const result = await getFormRenderingData(mockServerParams);

    expect(getServerFormRenderingDataMock).toHaveBeenCalled();
    expect(getIpInfoMock).toHaveBeenCalled();
    expect(addDefaultLocationMock).not.toHaveBeenCalled();
    expect(result).toEqual(formRenderingDataMock);
  });
});
