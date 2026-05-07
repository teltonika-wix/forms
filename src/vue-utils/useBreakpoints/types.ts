import type { Ref } from 'vue';

export type UseBreakpointsReturn = {
  isGreaterThanSm: Ref<boolean>;
  isGreaterThanMd: Ref<boolean>;
  isGreaterThanLg: Ref<boolean>;
  isGreaterThanXl: Ref<boolean>;
};
