import type { KeyWithNumberValue } from "../types";

export type CompareNumericallyParams<T> = {
  firstObject: T;
  secondObject: T;
  sortByKey: KeyWithNumberValue<T>;
};

export const compareNumerically = <T extends object>({
  firstObject,
  secondObject,
  sortByKey,
}: CompareNumericallyParams<T>): number => {
  const firstValue = firstObject[sortByKey] as number;
  const secondValue = secondObject[sortByKey] as number;

  return firstValue - secondValue;
};
