import { isSuccessfulStatusCode } from "src/utilities";
import { type Mock, vi } from "vitest";
import { createFullFormUrl } from "../createFullFormUrl";
import { getIpLocationInfo } from "../getIpLocationInfo";

vi.mock("src/utilities", () => ({
  isSuccessfulStatusCode: vi.fn(),
}));

vi.mock("../createFullFormUrl", () => ({
  createFullFormUrl: vi.fn(),
}));

const isSuccessfulStatusCodeMock = isSuccessfulStatusCode as unknown as Mock;
const createFullFormUrlMock = createFullFormUrl as unknown as Mock;

describe("getIpLocationInfo", () => {
  const mockFormWebClientEndpoint = "/form-endpoint";
  const mockLocationUrl = "https://example.com/form-endpoint/location";

  globalThis.fetch = vi.fn();
  const fetchMock = globalThis.fetch as Mock;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should fetch ip location successfully", async () => {
    createFullFormUrlMock.mockReturnValue(mockLocationUrl);
    isSuccessfulStatusCodeMock.mockReturnValue(true);
    fetchMock.mockResolvedValue({
      status: 200,
      json: vi.fn().mockResolvedValue({ data: { countryName: "Lithuania" } }),
    });

    const result = await getIpLocationInfo({
      formWebClientEndpoint: mockFormWebClientEndpoint,
    });

    expect(createFullFormUrlMock).toHaveBeenCalledWith({
      endpoint: "/location",
      searchParams: {},
      formWebClientEndpoint: mockFormWebClientEndpoint,
      isDev: undefined,
    });
    expect(fetchMock).toHaveBeenCalledWith(mockLocationUrl);
    expect(result).toEqual({
      status: 200,
      json: expect.any(Function),
    });
  });

  it("should throw an error when location request fails", async () => {
    createFullFormUrlMock.mockReturnValue(mockLocationUrl);
    isSuccessfulStatusCodeMock.mockReturnValue(false);
    fetchMock.mockResolvedValue({
      status: 500,
      json: vi.fn(),
    });

    await expect(
      getIpLocationInfo({
        formWebClientEndpoint: mockFormWebClientEndpoint,
      }),
    ).rejects.toThrow("Failed to fetch IP location");

    expect(fetchMock).toHaveBeenCalledWith(mockLocationUrl);
  });
});
