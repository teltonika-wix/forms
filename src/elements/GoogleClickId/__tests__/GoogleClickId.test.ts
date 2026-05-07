import { shallowMount } from "@vue/test-utils";
import { type Mock, vi } from "vitest";
import GoogleClickId from "../GoogleClickId.vue";
import { GoogleClickIdStorage } from "../stores/GoogleClickIdStorage";
import { extractGoogleClickIdParams } from "../utils/extractGoogleClickIdParams";

vi.mock("../utils/extractGoogleClickIdParams", () => ({
  extractGoogleClickIdParams: vi.fn(),
}));

vi.mock("../stores/GoogleClickIdStorage", () => ({
  GoogleClickIdStorage: {
    storeId: vi.fn(),
  },
}));

const extractGoogleClickIdParamsMock = extractGoogleClickIdParams as unknown as Mock;

describe("GoogleClickId.vue", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should call GoogleClickIdStorage.storeId when valid params are extracted", () => {
    const mockParams = { googleClickId: "gclid", googleClickIdSource: "gclsrc" };
    extractGoogleClickIdParamsMock.mockReturnValue(mockParams);

    shallowMount(GoogleClickId);

    expect(extractGoogleClickIdParams).toHaveBeenCalled();
    expect(GoogleClickIdStorage.storeId).toHaveBeenCalledWith(mockParams);
  });

  it("should not call GoogleClickIdStorage.storeId if params are not extracted", () => {
    extractGoogleClickIdParamsMock.mockReturnValue(undefined);

    shallowMount(GoogleClickId);

    expect(extractGoogleClickIdParams).toHaveBeenCalled();
    expect(GoogleClickIdStorage.storeId).not.toHaveBeenCalled();
  });
});
