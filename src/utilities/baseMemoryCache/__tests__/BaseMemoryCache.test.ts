import { describe, expect, it, vi } from "vitest";
import { BaseMemoryCache } from "../BaseMemoryCache";

describe("BaseMemoryCache", () => {
  it("should set and get a value from the cache", () => {
    const cache = new BaseMemoryCache<string>();
    cache.set({ key: "testKey", value: "testValue" });

    const result = cache.get("testKey");
    expect(result).toBe("testValue");
  });

  it("should return null for non-existing keys", () => {
    const cache = new BaseMemoryCache<string>();

    const result = cache.get("nonExistingKey");
    expect(result).toBeNull();
  });

  it("should delete a key from the cache", () => {
    const cache = new BaseMemoryCache<string>();
    cache.set({ key: "testKey", value: "testValue" });

    cache.delete("testKey");
    const result = cache.get("testKey");
    expect(result).toBeNull();
  });

  it("should clear all entries from the cache", () => {
    const cache = new BaseMemoryCache<string>();
    cache.set({ key: "key1", value: "value1" });
    cache.set({ key: "key2", value: "value2" });

    cache.clear();
    expect(cache.get("key1")).toBeNull();
    expect(cache.get("key2")).toBeNull();
  });

  it("should return true if the key exists", () => {
    const cache = new BaseMemoryCache<string>();
    cache.set({ key: "testKey", value: "testValue" });

    expect(cache.has("testKey")).toBe(true);
  });

  it("should return false if the key does not exist", () => {
    const cache = new BaseMemoryCache<string>();

    expect(cache.has("testKey")).toBe(false);
  });

  it("should return null for expired entries", () => {
    const cache = new BaseMemoryCache<string>(100); // 100ms TTL
    cache.set({ key: "testKey", value: "testValue" });

    // Mock the Date.now function to simulate expiration
    vi.spyOn(Date, "now").mockReturnValue(Date.now() + 200); // Advance time by 200ms

    const result = cache.get("testKey");
    expect(result).toBeNull();

    // Restore Date.now to the original function
    vi.restoreAllMocks();
  });

  it("should respect custom TTL for individual entries", () => {
    const cache = new BaseMemoryCache<string>();
    cache.set({ key: "testKey", value: "testValue", timeToLive: 50 });

    // Mock the Date.now function to simulate expiration
    vi.spyOn(Date, "now").mockReturnValue(Date.now() + 100); // Advance time by 100ms

    const result = cache.get("testKey");
    expect(result).toBeNull();

    vi.restoreAllMocks();
  });
});
