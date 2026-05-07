import { isObject } from "src/utilities";
import { type Mock, vi } from "vitest";
import { getValidationData } from "../getValidationData";

vi.mock("src/utilities", () => ({
  isObject: vi.fn(),
}));

const isObjectMock = isObject as unknown as Mock;

describe("getValidationData", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should return validation data when response is valid", async () => {
    const mockErrors = { field1: "Error message" };
    const mockResponseData = { data: { errors: mockErrors } };

    const response = {
      json: vi.fn().mockResolvedValue(mockResponseData),
    } as unknown as Response;

    isObjectMock.mockReturnValue(true);

    const result = await getValidationData(response);

    expect(result).toEqual(mockResponseData.data);
    expect(response.json).toHaveBeenCalled();
    expect(isObjectMock).toHaveBeenCalledWith(mockErrors);
  });

  it("should return an empty object if response data is invalid", async () => {
    const mockResponseData = { data: { errors: [] } };

    const response = {
      json: vi.fn().mockResolvedValue(mockResponseData),
    } as unknown as Response;

    isObjectMock.mockReturnValue(false);

    const result = await getValidationData(response);

    expect(result).toEqual({});
    expect(response.json).toHaveBeenCalled();
    expect(isObjectMock).toHaveBeenCalledWith([]);
  });

  it("should return an empty object if JSON parsing fails", async () => {
    const response = {
      json: vi.fn().mockImplementation(() => {
        throw new Error("JSON parse error");
      }),
    } as unknown as Response;

    const result = await getValidationData(response);

    expect(result).toEqual({});
    expect(response.json).toHaveBeenCalled();
  });
});
