export type ParsedTagName = string;

export const getTagName = (stringWithHtml: string): ParsedTagName => {
  // Regular expression to match the element tag name
  const tagPattern = /<(\w+)/;
  const tagMatch = tagPattern.exec(stringWithHtml);

  if (!tagMatch || !tagMatch[1]) {
    return '';
  }

  return tagMatch[1];
};
