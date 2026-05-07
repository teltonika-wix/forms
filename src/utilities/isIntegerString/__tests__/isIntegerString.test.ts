import { describe, expect, it } from "vitest";
import { isIntegerString } from "../isIntegerString";

describe("isIntegerString", () => {
  it("should return true for positive integers", () => {
    expect(isIntegerString("123")).toBe(true);
    expect(isIntegerString("0")).toBe(true);
  });

  it("should return true for negative integers", () => {
    expect(isIntegerString("-123")).toBe(true);
  });

  it("should return false for decimal numbers", () => {
    expect(isIntegerString("123.45")).toBe(false);
    expect(isIntegerString("-123.45")).toBe(false);
  });

  it("should return false for non-numeric strings", () => {
    expect(isIntegerString("abc")).toBe(false);
    expect(isIntegerString("123abc")).toBe(false);
  });

  it("should return false for empty strings", () => {
    expect(isIntegerString("")).toBe(false);
  });

  it("should return false for strings with spaces", () => {
    expect(isIntegerString(" 123")).toBe(false);
    expect(isIntegerString("123 ")).toBe(false);
    expect(isIntegerString("12 3")).toBe(false);
  });

  it("should return false for special characters", () => {
    expect(isIntegerString("+123")).toBe(false);
    expect(isIntegerString("123-")).toBe(false);
    expect(isIntegerString("123,456")).toBe(false);
  });
});
