import { describe, expect, it } from "vitest";
import { getYoutubeThumbUrl } from "../getYoutubeThumbUrl";

describe("getYoutubeThumbUrl", () => {
  it("should create a Youtube thumb url", () => {
    const link = "https://www.youtube.com/watch?v=nc4RSUPcRfA";

    const result = getYoutubeThumbUrl(link);
    expect(result).toBe("https://img.youtube.com/vi_webp/nc4RSUPcRfA/maxresdefault.webp");
  });
});
