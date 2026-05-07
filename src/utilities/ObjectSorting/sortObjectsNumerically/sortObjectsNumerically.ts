import type { SortDirection } from '../types';
import { sortNumericallyAscending } from './sortNumericallyAscending';
import { sortNumericallyDescending } from './sortNumericallyDescending';
import type { SortNumericallyBaseParams } from './types';

export type SortNumericallyParams<T extends object> = SortNumericallyBaseParams<T> & {
  direction: SortDirection;
};

export const sortObjectsNumerically = <T extends object>({
  list,
  sortByKey,
  direction = 'ascending',
}: SortNumericallyParams<T>): T[] => {
  if (direction === 'ascending') {
    return sortNumericallyAscending({
      list,
      sortByKey,
    });
  }

  return sortNumericallyDescending({
    list,
    sortByKey,
  });
};
