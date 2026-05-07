import { describe, expect, it } from "vitest";
import { getTagName } from "../getTagName";

describe("getTagName", () => {
  it("should extract the tag name from a simple tag", () => {
    const htmlString = '<div class="container">';
    const result = getTagName(htmlString);
    expect(result).toBe("div");
  });

  it("should return an empty string for non-tag strings", () => {
    const htmlString = "plain text";
    const result = getTagName(htmlString);
    expect(result).toBe("");
  });

  it("should extract the tag name from a self-closing tag", () => {
    const htmlString = '<img src="image.jpg" />';
    const result = getTagName(htmlString);
    expect(result).toBe("img");
  });

  it("should handle multiple tags and return the first tag name", () => {
    const htmlString = "<div><span>content</span></div>";
    const result = getTagName(htmlString);
    expect(result).toBe("div");
  });

  it("should ignore case sensitivity and return the tag name", () => {
    const htmlString = '<DIV class="container">';
    const result = getTagName(htmlString);
    expect(result).toBe("DIV");
  });

  it("should handle tags with attributes and extract the tag name", () => {
    const htmlString = '<a href="https://example.com">';
    const result = getTagName(htmlString);
    expect(result).toBe("a");
  });
});
