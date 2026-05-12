import { type Mock, vi } from "vitest";
import { FormWebClient } from "../../../../FormClients/FormWebClient";
import { type IPAddressInfo, validateIpInfoData } from "../../validateIpInfoData";
import { getBrowserIpInfo } from "../getBrowserIpInfo";

vi.mock("../../../../FormClients/FormWebClient", () => ({
  FormWebClient: {
    getIpLocationInfo: vi.fn(),
  },
}));

vi.mock("../../validateIpInfoData", () => ({
  validateIpInfoData: vi.fn(),
}));

const getIpLocationInfoMock = FormWebClient.getIpLocationInfo as unknown as Mock;
const validateIpInfoDataMock = validateIpInfoData as unknown as Mock;

describe("getBrowserIpInfo", () => {
  const mockFormWebClientEndpoint = "/form-endpoint";
  const mockValidIPInfoData: IPAddressInfo = {
    bogon: false,
    countryCode: "LT",
    countryName: "Lithuania",
    ip: "192.168.1.1",
    loc: "54.6872,25.2797",
    region: "Vilnius",
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should return IP info data when response is valid", async () => {
    const mockResponse = {
      json: vi.fn().mockResolvedValue({ data: mockValidIPInfoData }),
    };

    getIpLocationInfoMock.mockResolvedValue(mockResponse);
    validateIpInfoDataMock.mockReturnValue(true);

    const result = await getBrowserIpInfo({
      formWebClientEndpoint: mockFormWebClientEndpoint,
    });

    expect(getIpLocationInfoMock).toHaveBeenCalledWith({
      formWebClientEndpoint: mockFormWebClientEndpoint,
      isDev: undefined,
    });
    expect(validateIpInfoDataMock).toHaveBeenCalledWith(mockValidIPInfoData);
    expect(result).toEqual(mockValidIPInfoData);
  });

  it("should return null when response data is invalid", async () => {
    const mockResponse = {
      json: vi.fn().mockResolvedValue({ data: mockValidIPInfoData }),
    };

    getIpLocationInfoMock.mockResolvedValue(mockResponse);
    validateIpInfoDataMock.mockReturnValue(false);

    const result = await getBrowserIpInfo({
      formWebClientEndpoint: mockFormWebClientEndpoint,
    });

    expect(result).toBeNull();
  });

  it("should return null when location request fails", async () => {
    getIpLocationInfoMock.mockRejectedValue(new Error("Network error"));

    const result = await getBrowserIpInfo({
      formWebClientEndpoint: mockFormWebClientEndpoint,
    });

    expect(result).toBeNull();
  });
});
