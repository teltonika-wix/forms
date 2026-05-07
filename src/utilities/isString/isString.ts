export const isString = (value: unknown, allowEmpty = false): value is string => {
  return (typeof value === "string" || value instanceof String) && (allowEmpty || value.length > 0);
};
