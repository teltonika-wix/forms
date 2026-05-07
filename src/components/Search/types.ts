import type { SearchSize } from './searchTheme';

export type SearchProps = {
  modelValue: string;
  label?: string;
  debounce?: number;
  size: SearchSize;
};

export type ExpandableSearchProps = SearchProps & {
  expanded?: boolean;
};

export type SearchEmits = {
  'update:modelValue': [modelValue: SearchProps['modelValue']];
};
