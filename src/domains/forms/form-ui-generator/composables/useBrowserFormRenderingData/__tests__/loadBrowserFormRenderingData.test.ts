import { type Mock, vi } from "vitest";
import { FormDataService, type FormRenderingDataResponse } from "src/domains/forms/forms-kit";
import { FormRenderingDataCache } from "../FormRenderingDataCache";
import { loadBrowserFormRenderingData } from "../loadBrowserFormRenderingData";

vi.mock("src/domains/forms/forms-kit", () => ({
  FormDataService: {
    getFormRenderingData: vi.fn(),
  },
}));

const getFormRenderingDataMock = FormDataService.getFormRenderingData as unknown as Mock;

const createFormRenderingData = (): FormRenderingDataResponse =>
  ({ inputs: [] }) as unknown as FormRenderingDataResponse;

describe("loadBrowserFormRenderingData", () => {
  const formUrlParameters = {
    language: "en",
    form: "ContactForm",
  } as const;
  const formWebClientEndpoint = "/form-endpoint";

  beforeEach(() => {
    vi.clearAllMocks();
    FormRenderingDataCache.clear();
  });

  it("returns cached rendering data without fetching", async () => {
    const cachedData = createFormRenderingData();
    FormRenderingDataCache.set({
      key: JSON.stringify(formUrlParameters),
      value: cachedData,
    });

    const result = await loadBrowserFormRenderingData({
      formUrlParameters,
      formWebClientEndpoint,
    });

    expect(getFormRenderingDataMock).not.toHaveBeenCalled();
    expect(result).toBe(cachedData);
  });

  it("dedupes concurrent requests for the same form key", async () => {
    let resolveRequest: ((value: FormRenderingDataResponse) => void) | null = null;
    const request = new Promise<FormRenderingDataResponse>((resolve) => {
      resolveRequest = resolve;
    });

    getFormRenderingDataMock.mockReturnValue(request);

    const firstCall = loadBrowserFormRenderingData({
      formUrlParameters,
      formWebClientEndpoint,
    });
    const secondCall = loadBrowserFormRenderingData({
      formUrlParameters,
      formWebClientEndpoint,
    });

    expect(getFormRenderingDataMock).toHaveBeenCalledTimes(1);

    const responseData = createFormRenderingData();
    resolveRequest?.(responseData);

    const [firstResult, secondResult] = await Promise.all([firstCall, secondCall]);

    expect(firstResult).toEqual(responseData);
    expect(secondResult).toEqual(responseData);
  });

  it("caches successful response and reuses it in later calls", async () => {
    const remoteData = createFormRenderingData();
    getFormRenderingDataMock.mockResolvedValue(remoteData);

    const firstResult = await loadBrowserFormRenderingData({
      formUrlParameters,
      formWebClientEndpoint,
    });
    const secondResult = await loadBrowserFormRenderingData({
      formUrlParameters,
      formWebClientEndpoint,
    });

    expect(getFormRenderingDataMock).toHaveBeenCalledTimes(1);
    expect(firstResult).toEqual(remoteData);
    expect(secondResult).toEqual(remoteData);
  });
});
