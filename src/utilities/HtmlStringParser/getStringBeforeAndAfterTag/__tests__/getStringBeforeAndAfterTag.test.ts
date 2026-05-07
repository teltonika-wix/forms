import { type Mock, describe, expect, it, vi } from "vitest";
import { isString } from "../../../isString";
import { getStringBeforeAndAfterTag } from "../getStringBeforeAndAfterTag";

vi.mock("../../../isString", () => ({
  isString: vi.fn(),
}));

const isStringMock = isString as unknown as Mock;
describe("getStringBeforeAndAfterTag", () => {
  afterEach(() => {
    isStringMock.mockReset();
  });

  it("should extract text before and after a simple tag", () => {
    const htmlString = "Text before <div>Some content</div> Text after";
    isStringMock.mockReturnValue(true);

    const result = getStringBeforeAndAfterTag({ stringWithHtml: htmlString, tagName: "div" });

    expect(isStringMock).toHaveBeenCalledWith("Text before ");
    expect(isStringMock).toHaveBeenCalledWith(" Text after");
    expect(result).toEqual({
      stringBeforeTag: "Text before ",
      stringAfterTag: " Text after",
    });
  });

  it("should return empty strings when no text exists before or after the tag", () => {
    const htmlString = "<div>Some content</div>";
    isStringMock.mockReturnValue(true);

    const result = getStringBeforeAndAfterTag({ stringWithHtml: htmlString, tagName: "div" });

    expect(isStringMock).toHaveBeenCalledWith("");
    expect(isStringMock).toHaveBeenCalledWith("");
    expect(result).toEqual({
      stringBeforeTag: "",
      stringAfterTag: "",
    });
  });

  it("should return an empty object when the tag is not found", () => {
    const htmlString = "Some random text";
    isStringMock.mockReturnValue(true);

    const result = getStringBeforeAndAfterTag({ stringWithHtml: htmlString, tagName: "div" });

    expect(isStringMock).not.toHaveBeenCalled();
    expect(result).toEqual({});
  });

  it("should handle cases where there is text only before the tag", () => {
    const htmlString = "Text before <div>Some content</div>";
    isStringMock.mockReturnValue(true);

    const result = getStringBeforeAndAfterTag({ stringWithHtml: htmlString, tagName: "div" });

    expect(isStringMock).toHaveBeenCalledWith("Text before ");
    expect(isStringMock).toHaveBeenCalledWith("");
    expect(result).toEqual({
      stringBeforeTag: "Text before ",
      stringAfterTag: "",
    });
  });

  it("should handle cases where there is text only after the tag", () => {
    const htmlString = "<div>Some content</div> Text after";
    isStringMock.mockReturnValue(true);

    const result = getStringBeforeAndAfterTag({ stringWithHtml: htmlString, tagName: "div" });

    expect(isStringMock).toHaveBeenCalledWith("");
    expect(isStringMock).toHaveBeenCalledWith(" Text after");
    expect(result).toEqual({
      stringBeforeTag: "",
      stringAfterTag: " Text after",
    });
  });

  it("should work with nested tags inside the target tag", () => {
    const htmlString = "Text before <div><span>Nested content</span></div> Text after";
    isStringMock.mockReturnValue(true);

    const result = getStringBeforeAndAfterTag({ stringWithHtml: htmlString, tagName: "div" });

    expect(isStringMock).toHaveBeenCalledWith("Text before ");
    expect(isStringMock).toHaveBeenCalledWith(" Text after");
    expect(result).toEqual({
      stringBeforeTag: "Text before ",
      stringAfterTag: " Text after",
    });
  });
});
