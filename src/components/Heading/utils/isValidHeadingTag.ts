import { isString } from "src/utilities";
import { HEADING_TAGS, type HeadingTags } from "../../Text";

export const isValidHeadingTag = (tag: unknown): tag is HeadingTags => {
  if (!isString(tag)) {
    return false;
  }

  return HEADING_TAGS.some((headingTag) => headingTag === tag);
};
