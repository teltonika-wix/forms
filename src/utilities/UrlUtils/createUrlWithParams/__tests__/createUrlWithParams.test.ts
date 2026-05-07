import { describe, expect, it } from "vitest";
import { type CreateUrlWithParamsData, createUrlWithParams } from "../createUrlWithParams";

const baseUrl = "https://example.com";
const baseEndpoint = "/api";

describe("createUrlWithParams", () => {
  it("should create a URL without search params", () => {
    const data: CreateUrlWithParamsData = {
      baseUrl,
      endpoint: baseEndpoint,
      searchParams: {},
    };

    const result = createUrlWithParams(data);
    expect(result).toBe("https://example.com/api");
  });

  it("should create a URL with search params", () => {
    const data: CreateUrlWithParamsData = {
      baseUrl,
      endpoint: baseEndpoint,
      searchParams: { foo: "bar", baz: "qux" },
    };

    const result = createUrlWithParams(data);
    expect(result).toBe("https://example.com/api?foo=bar&baz=qux");
  });

  it("should create a URL with baseUrl only if endpoint is not provided", () => {
    const data: CreateUrlWithParamsData = {
      baseUrl,
      searchParams: { foo: "bar" },
    };

    const result = createUrlWithParams(data);
    expect(result).toBe("https://example.com/?foo=bar");
  });

  it("should return a URL without query string if searchParams is empty", () => {
    const data: CreateUrlWithParamsData = {
      baseUrl,
      endpoint: baseEndpoint,
      searchParams: {},
    };

    const result = createUrlWithParams(data);
    expect(result).toBe("https://example.com/api");
  });

  it("should correctly handle complex search params", () => {
    const data: CreateUrlWithParamsData = {
      baseUrl,
      endpoint: "/search",
      searchParams: {
        query: "test",
        page: "1",
        filter: "date",
      },
    };

    const result = createUrlWithParams(data);
    expect(result).toBe("https://example.com/search?query=test&page=1&filter=date");
  });
});
