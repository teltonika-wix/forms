import type { KeyWithStringValue } from './types';

export type CompareAlphabeticallyParams<T> = {
  firstObject: T;
  secondObject: T;
  sortByKey: KeyWithStringValue<T>;
};

export const compareAlphabetically = <T extends object>({
  firstObject,
  secondObject,
  sortByKey,
}: CompareAlphabeticallyParams<T>): number => {
  const firstValue = firstObject[sortByKey] as string; // "as" is used because the provided sortBy has a string value in firstObject and secondObject.
  const secondValue = secondObject[sortByKey] as string;

  return firstValue.localeCompare(secondValue);
};
