export const isIntegerString = (textValue: string): boolean => {
  return /^-?\d+$/.test(textValue);
};
