export const isKeyInObject = <T extends object>(
  key: PropertyKey,
  dataObject: T,
): key is keyof T => {
  if (!dataObject) {
    return false;
  }

  return key in dataObject;
};
