import { type Mock, vi } from "vitest";
import type { GoogleClickIdRecord } from "../../../types";
import { getExpiryData } from "../../../utils/getExpiryData";
import { storeGoogleClickId } from "../storeGoogleClickId";

vi.mock("../../../utils/getExpiryData", () => ({
  getExpiryData: vi.fn(),
}));

const getExpiryDataMock = getExpiryData as Mock;

describe("storeGoogleClickId", () => {
  const mockStorageKey = "mockStorageKey";
  const mockGoogleClickId = "mockGoogleClickId";

  beforeEach(() => {
    localStorage.clear();
    getExpiryDataMock.mockReturnValue(123456789); // Mock expiry time
  });

  it('should store googleClickId in localStorage if googleClickIdSource contains "aw"', () => {
    const mockParams = {
      googleClickId: mockGoogleClickId,
      googleClickIdSource: "aw-some-source", // contains 'aw'
    };

    storeGoogleClickId(mockStorageKey, mockParams);

    const storedValue = localStorage.getItem(mockStorageKey);
    expect(storedValue).not.toBeNull();

    const parsedValue = JSON.parse(storedValue as string) as GoogleClickIdRecord;
    expect(parsedValue.googleClickId).toBe(mockGoogleClickId);
    expect(parsedValue.expiryDate).toBe(123456789); // Mock expiry value
  });

  it('should store googleClickId in localStorage even if source does not contain "aw"', () => {
    const mockParams = {
      googleClickId: mockGoogleClickId,
      googleClickIdSource: "invalid-source", // does not contain 'aw'
    };

    storeGoogleClickId(mockStorageKey, mockParams);

    const storedValue = localStorage.getItem(mockStorageKey);
    expect(storedValue).not.toBeNull();
  });

  it("should handle errors gracefully and not throw", () => {
    const mockParams = {
      googleClickId: mockGoogleClickId,
      googleClickIdSource: "aw-some-source",
    };

    const setItemSpy = vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
      throw new Error("LocalStorage error");
    });

    expect(() => storeGoogleClickId(mockStorageKey, mockParams)).not.toThrow();

    setItemSpy.mockRestore();
  });
});
