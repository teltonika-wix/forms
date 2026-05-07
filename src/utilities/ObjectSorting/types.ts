export type KeyWithNumberValue<T> = {
  [K in keyof T]: T[K] extends number ? K : never;
}[keyof T];

export type SortDirection = 'ascending' | 'descending';
