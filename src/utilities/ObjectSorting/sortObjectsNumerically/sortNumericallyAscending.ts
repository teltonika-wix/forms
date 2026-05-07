import { compareNumerically } from './compareNumerically';
import type { SortNumericallyBaseParams } from './types';

export type SortNumericallyAscendingParams<T extends object> = SortNumericallyBaseParams<T>;

export const sortNumericallyAscending = <T extends object>({
  list,
  sortByKey,
}: SortNumericallyAscendingParams<T>): T[] => {
  return list.slice().sort((firstObject, secondObject) => {
    return compareNumerically({ firstObject, secondObject, sortByKey });
  });
};
