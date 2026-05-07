import { type Mock, vi } from "vitest";
import { FormServerClient } from "../../../../FormClients/FormServerClient";
import { type IPAddressInfo, validateIpInfoData } from "../../validateIpInfoData";
import { getIpInfo } from "../getIpInfo";

vi.mock("../../../../FormClients/FormServerClient", () => ({
  FormServerClient: {
    getIpLocationInfo: vi.fn(),
  },
}));

vi.mock("../../validateIpInfoData", () => ({
  validateIpInfoData: vi.fn(),
}));

const getIpLocationInfoMock = FormServerClient.getIpLocationInfo as unknown as Mock;
const validateIpInfoDataMock = validateIpInfoData as unknown as Mock;

describe("getIpInfo", () => {
  const mockFormSecrets = {
    formMicroserviceUrl: "https://form-service.com",
    formMicroserviceToken: "token",
  };
  const mockClientIp = "192.168.1.1";
  const mockValidIPInfoData: IPAddressInfo = {
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

  it("should return IP info data for a valid client IP", async () => {
    const mockResponse = {
      json: vi.fn().mockResolvedValue({ data: mockValidIPInfoData }),
    };

    getIpLocationInfoMock.mockResolvedValue(mockResponse);
    validateIpInfoDataMock.mockReturnValue(true);

    const result = await getIpInfo({ clientIp: mockClientIp, formSecrets: mockFormSecrets });

    expect(getIpLocationInfoMock).toHaveBeenCalledWith({
      userIp: mockClientIp,
      formSecrets: mockFormSecrets,
    });
    expect(validateIpInfoDataMock).toHaveBeenCalledWith(mockValidIPInfoData);
    expect(result).toEqual(mockValidIPInfoData);
  });

  it("should return null for an invalid client IP", async () => {
    const mockResponse = {
      json: vi.fn().mockResolvedValue({ data: mockValidIPInfoData }),
    };

    getIpLocationInfoMock.mockResolvedValue(mockResponse);
    validateIpInfoDataMock.mockReturnValue(false);

    const result = await getIpInfo({ clientIp: mockClientIp, formSecrets: mockFormSecrets });

    expect(getIpLocationInfoMock).toHaveBeenCalledWith({
      userIp: mockClientIp,
      formSecrets: mockFormSecrets,
    });
    expect(validateIpInfoDataMock).toHaveBeenCalledWith(mockValidIPInfoData);
    expect(result).toBeNull();
  });

  it("should return null if no client IP is provided", async () => {
    const result = await getIpInfo({ formSecrets: mockFormSecrets });

    expect(result).toBeNull();
    expect(getIpLocationInfoMock).not.toHaveBeenCalled();
  });

  it("should return null if an error occurs", async () => {
    getIpLocationInfoMock.mockRejectedValue(new Error("Network error"));

    const result = await getIpInfo({ clientIp: mockClientIp, formSecrets: mockFormSecrets });

    expect(result).toBeNull();
  });
});
