import { compareAlphabetically } from './compareAlphabetically';
import type { KeyWithStringValue } from './types';

export type SortAlphabeticallyParams<T extends object> = { list: T[]; sortByKey: KeyWithStringValue<T> };

export const sortObjectsAlphabetically = <T extends object>({ list, sortByKey }: SortAlphabeticallyParams<T>): T[] => {
  return list
    .slice()
    .sort((firstObject, secondObject) => compareAlphabetically({ firstObject, secondObject, sortByKey }));
};
