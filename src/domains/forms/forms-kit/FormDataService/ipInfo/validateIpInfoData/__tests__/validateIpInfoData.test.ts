import { jsonSchemaValidation } from "src/utilities";
import { type Mock, vi } from "vitest";
import ipInfoDataSchema from "../ipInfoDataSchema.json";
import type { IPAddressInfo } from "../types";
import { validateIpInfoData } from "../validateIpInfoData";

vi.mock("src/utilities", () => ({
  jsonSchemaValidation: vi.fn(),
}));

const jsonSchemaValidationMock = jsonSchemaValidation as unknown as Mock;

describe("validateIpInfoData", () => {
  const validIPInfoData: IPAddressInfo = {
    bogon: false,
    countryCode: "US",
    countryName: "United States",
    ip: "192.168.1.1",
    loc: "37.7749,-122.4194",
    region: "California",
  };

  it("should return true for valid IP info data", () => {
    jsonSchemaValidationMock.mockReturnValue({ isDataValid: true });

    const result = validateIpInfoData(validIPInfoData);

    expect(jsonSchemaValidationMock).toHaveBeenCalledWith(validIPInfoData, ipInfoDataSchema);
    expect(result).toBe(true);
  });

  it("should return false for invalid IP info data", () => {
    jsonSchemaValidationMock.mockReturnValue({ isDataValid: false });

    const result = validateIpInfoData({});

    expect(jsonSchemaValidationMock).toHaveBeenCalledWith({}, ipInfoDataSchema);
    expect(result).toBe(false);
  });

  it("should return false if an error occurs during validation", () => {
    jsonSchemaValidationMock.mockImplementation(() => {
      throw new Error("Validation error");
    });

    const result = validateIpInfoData(validIPInfoData);

    expect(jsonSchemaValidationMock).toHaveBeenCalledWith(validIPInfoData, ipInfoDataSchema);
    expect(result).toBe(false);
  });
});
