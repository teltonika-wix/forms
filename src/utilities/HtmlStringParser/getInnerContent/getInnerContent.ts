export type GetInnerContentParams = { stringWithHtml: string; tagName: string };

export type ParsedInnerContent = string;

export const getInnerContent = ({ stringWithHtml, tagName }: GetInnerContentParams): ParsedInnerContent => {
  const valuePattern = new RegExp(`<${tagName}[^>]*>(.*?)<\\/${tagName}>`, 's');
  const valueMatch = valuePattern.exec(stringWithHtml);

  if (!valueMatch || !valueMatch[1]) {
    return '';
  }

  return valueMatch[1];
};
