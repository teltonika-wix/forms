import { isString } from "../../isString";

export type ParsedText = {
  stringBeforeTag?: string;
  stringAfterTag?: string;
};

export type GetStringBeforeAndAfterTagParams = {
  stringWithHtml: string;
  tagName: string;
};

export const getStringBeforeAndAfterTag = ({
  stringWithHtml,
  tagName,
}: GetStringBeforeAndAfterTagParams): ParsedText => {
  // Regular expression to match text before and after the specified tag
  const tagPattern = new RegExp(`(.*?)<${tagName}[^>]*>.*?<\\/${tagName}>(.*)`, "s");
  const match = stringWithHtml.match(tagPattern);

  if (!match) {
    return {};
  }

  const stringBeforeTag = isString(match[1]) ? match[1].trimStart() : "";
  const stringAfterTag = isString(match[2]) ? match[2].trimEnd() : "";

  return { stringBeforeTag, stringAfterTag };
};
