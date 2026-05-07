export const isObject = (object: unknown): object is Record<string, unknown> => {
  return object instanceof Object && object.constructor === Object;
};
