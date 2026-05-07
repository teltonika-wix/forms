import { getUrlFromBrowser } from "../getUrlFromBrowser";

describe("getUrlFromBrowser", () => {
  globalThis.window = {
    location: {
      href: "https://example.com/path?query=1",
    },
  } as unknown as Window & typeof globalThis;

  it("should return a URL object when window.location.href is valid", () => {
    const result = getUrlFromBrowser();

    expect(result).toBeInstanceOf(URL);
    expect(result?.href).toBe("https://example.com/path?query=1");
  });

  it("should return null when an error occurs", () => {
    globalThis.window.location = {
      href: "invalid-url", // Set an invalid URL to trigger an error
    } as Location;

    const result = getUrlFromBrowser();

    expect(result).toBeNull();
  });
});
