import { compareNumerically } from './compareNumerically';
import type { SortNumericallyBaseParams } from './types';

export type SortNumericallyDescendingParams<T extends object> = SortNumericallyBaseParams<T>;

export const sortNumericallyDescending = <T extends object>({
  list,
  sortByKey,
}: SortNumericallyDescendingParams<T>): T[] => {
  return list.slice().sort((firstObject, secondObject) => {
    return compareNumerically({ firstObject, secondObject, sortByKey }) * -1;
  });
};
