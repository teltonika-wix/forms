import { describe, expect, it } from "vitest";
import { extractSearchParams } from "../extractSearchParams";

describe("extractSearchParams", () => {
  it("should return null for parameters not present in the URL", () => {
    const url = new URL("https://example.com?foo=bar");
    const params = ["foo", "baz", "qux"];

    const result = extractSearchParams(url, params);

    expect(result).toEqual(["bar", null, null]);
  });

  it("should return the correct values for the parameters present in the URL", () => {
    const url = new URL("https://example.com?foo=bar&baz=qux");
    const params = ["foo", "baz"];

    const result = extractSearchParams(url, params);

    expect(result).toEqual(["bar", "qux"]);
  });

  it("should handle an empty URL search string", () => {
    const url = new URL("https://example.com");
    const params = ["foo", "baz"];

    const result = extractSearchParams(url, params);

    expect(result).toEqual([null, null]);
  });

  it("should handle a single parameter correctly", () => {
    const url = new URL("https://example.com?foo=bar");
    const params = ["foo"];

    const result = extractSearchParams(url, params);

    expect(result).toEqual(["bar"]);
  });

  it("should return null for undefined parameters", () => {
    const url = new URL("https://example.com?foo=bar");
    const params = ["baz"];

    const result = extractSearchParams(url, params);

    expect(result).toEqual([null]);
  });
});
