export type ParsedTagAttributesData = Record<string, string | undefined>;

export const getTagAttributes = (stringWithHtml: string): ParsedTagAttributesData => {
  const attributes: ParsedTagAttributesData = {};
  const attributesPattern = /<\w+([^>]*)>/;
  const attributesMatch = attributesPattern.exec(stringWithHtml);

  if (!attributesMatch || !attributesMatch[1]) {
    return {};
  }

  const attributesString = attributesMatch[1];
  const attributePattern = /(\w+)=["']([^"']*)["']/g;
  const parsedAttributes = attributesString.matchAll(attributePattern);

  Array.from(parsedAttributes).forEach((match) => {
    const key = match[1];
    const value = match[2];

    if (!key) {
      return;
    }

    attributes[key] = value;
  });

  return attributes;
};
