import { isString } from '../../isString';
import { type ParsedInnerContent, getInnerContent } from '../getInnerContent';
import { type ParsedText, getStringBeforeAndAfterTag } from '../getStringBeforeAndAfterTag';
import { type ParsedTagAttributesData, getTagAttributes } from '../getTagAttributes';
import { type ParsedTagName, getTagName } from '../getTagName';

export type ParsedHtmlStringData = ParsedText & {
  tagName?: ParsedTagName;
  tagAttributes?: ParsedTagAttributesData;
  innerContent?: ParsedInnerContent;
};

export const parseStringWithHtml = (stringWithHtml: string): ParsedHtmlStringData => {
  if (!isString(stringWithHtml)) {
    return {};
  }

  const tagName = getTagName(stringWithHtml);

  if (!tagName) {
    return {};
  }

  const tagAttributes = getTagAttributes(stringWithHtml);
  const stringWithTagParams = { stringWithHtml, tagName };

  const isSelfClosingTag = /\/\s*>$/.test(stringWithHtml);

  if (isSelfClosingTag) {
    return { tagName, tagAttributes, innerContent: '', stringBeforeTag: '', stringAfterTag: '' };
  }

  const innerContent = getInnerContent(stringWithTagParams);
  const { stringBeforeTag, stringAfterTag } = getStringBeforeAndAfterTag(stringWithTagParams);

  return { tagName, tagAttributes, innerContent, stringBeforeTag, stringAfterTag };
};
