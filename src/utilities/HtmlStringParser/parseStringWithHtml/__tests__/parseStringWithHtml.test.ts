import { type Mock, afterEach, describe, expect, it, vi } from "vitest";
import { isString } from "../../../isString";
import { getInnerContent } from "../../getInnerContent";
import { getStringBeforeAndAfterTag } from "../../getStringBeforeAndAfterTag";
import { getTagAttributes } from "../../getTagAttributes";
import { getTagName } from "../../getTagName";
import { parseStringWithHtml } from "../parseStringWithHtml";

vi.mock("../../../isString", () => ({
  isString: vi.fn(),
}));

vi.mock("../../getTagName", () => ({
  getTagName: vi.fn(),
}));

vi.mock("../../getTagAttributes", () => ({
  getTagAttributes: vi.fn(),
}));

vi.mock("../../getInnerContent", () => ({
  getInnerContent: vi.fn(),
}));

vi.mock("../../getStringBeforeAndAfterTag", () => ({
  getStringBeforeAndAfterTag: vi.fn(),
}));

const isStringMock = isString as unknown as Mock;
const getTagNameMock = getTagName as unknown as Mock;
const getTagAttributesMock = getTagAttributes as unknown as Mock;
const getInnerContentMock = getInnerContent as unknown as Mock;
const getStringBeforeAndAfterTagMock = getStringBeforeAndAfterTag as unknown as Mock;

describe("parseStringWithHtml", () => {
  afterEach(() => {
    isStringMock.mockReset();
    getTagNameMock.mockReset();
    getTagAttributesMock.mockReset();
    getInnerContentMock.mockReset();
    getStringBeforeAndAfterTagMock.mockReset();
  });

  it("should parse tag name, attributes, and inner content from HTML string", () => {
    isStringMock.mockReturnValue(true);
    getTagNameMock.mockReturnValue("div");
    getTagAttributesMock.mockReturnValue({ class: "container" });
    getInnerContentMock.mockReturnValue("Content");
    getStringBeforeAndAfterTagMock.mockReturnValue({ stringBeforeTag: "", stringAfterTag: "" });

    const result = parseStringWithHtml('<div class="container">Content</div>');

    expect(result).toEqual({
      tagName: "div",
      tagAttributes: { class: "container" },
      innerContent: "Content",
      stringBeforeTag: "",
      stringAfterTag: "",
    });
  });

  it("should return an empty object for non-string input", () => {
    isStringMock.mockReturnValue(false);
    const result = parseStringWithHtml(null as unknown as string);
    expect(result).toEqual({});
  });

  it("should return an empty object for invalid HTML string", () => {
    isStringMock.mockReturnValue(true);
    getTagNameMock.mockReturnValue("");
    const result = parseStringWithHtml("plain text");
    expect(result).toEqual({});
  });

  it("should handle tags with text before and after the tag", () => {
    isStringMock.mockReturnValue(true);
    getTagNameMock.mockReturnValue("div");
    getTagAttributesMock.mockReturnValue({});
    getInnerContentMock.mockReturnValue("Content");
    getStringBeforeAndAfterTagMock.mockReturnValue({
      stringBeforeTag: "Text before",
      stringAfterTag: "Text after",
    });

    const result = parseStringWithHtml("Text before <div>Content</div> Text after");

    expect(result).toEqual({
      tagName: "div",
      tagAttributes: {},
      innerContent: "Content",
      stringBeforeTag: "Text before",
      stringAfterTag: "Text after",
    });
  });

  it("should handle self-closing tags with attributes", () => {
    isStringMock.mockReturnValue(true);
    getTagNameMock.mockReturnValue("img");
    getTagAttributesMock.mockReturnValue({ src: "image.jpg", alt: "description" });
    getInnerContentMock.mockReturnValue("");
    getStringBeforeAndAfterTagMock.mockReturnValue({ stringBeforeTag: "", stringAfterTag: "" });

    const result = parseStringWithHtml('<img src="image.jpg" alt="description" />');

    expect(result).toEqual({
      tagName: "img",
      tagAttributes: { src: "image.jpg", alt: "description" },
      innerContent: "",
      stringBeforeTag: "",
      stringAfterTag: "",
    });
  });

  it("should handle single tag without attributes or content", () => {
    isStringMock.mockReturnValue(true);
    getTagNameMock.mockReturnValue("br");
    getTagAttributesMock.mockReturnValue({});
    getInnerContentMock.mockReturnValue("");
    getStringBeforeAndAfterTagMock.mockReturnValue({ stringBeforeTag: "", stringAfterTag: "" });

    const result = parseStringWithHtml("<br />");

    expect(result).toEqual({
      tagName: "br",
      tagAttributes: {},
      innerContent: "",
      stringBeforeTag: "",
      stringAfterTag: "",
    });
  });

  it("should return empty content when no inner content is found", () => {
    isStringMock.mockReturnValue(true);
    getTagNameMock.mockReturnValue("div");
    getTagAttributesMock.mockReturnValue({});
    getInnerContentMock.mockReturnValue("");
    getStringBeforeAndAfterTagMock.mockReturnValue({ stringBeforeTag: "", stringAfterTag: "" });

    const result = parseStringWithHtml("<div></div>");

    expect(result).toEqual({
      tagName: "div",
      tagAttributes: {},
      innerContent: "",
      stringBeforeTag: "",
      stringAfterTag: "",
    });
  });
});
