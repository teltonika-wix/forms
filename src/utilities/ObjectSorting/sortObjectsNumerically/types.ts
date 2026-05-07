import type { KeyWithNumberValue } from "../types";

export type SortNumericallyBaseParams<T extends object> = {
  list: T[];
  sortByKey: KeyWithNumberValue<T>;
};
