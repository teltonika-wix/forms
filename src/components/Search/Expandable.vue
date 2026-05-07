<script setup lang="ts">
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/vue/24/outline';
import { useMountedRefWidth } from 'src/vue-utils';
import { useDebounceFn } from '@vueuse/core';
import { type ExpandableSearchProps, type SearchEmits } from './types';
import { nextTick, ref, watch } from 'vue';

const isExpanded = defineModel<boolean>('expanded');
const { label = 'Search', debounce = 0, modelValue } = defineProps<ExpandableSearchProps>();

const emits = defineEmits<SearchEmits>();
const labelRef = ref<HTMLInputElement | null>(null);
const { width: labelElementWidth, ready } = useMountedRefWidth(labelRef);

const searchInputRef = ref<HTMLInputElement | null>(null);

watch(isExpanded, (newValue) => {
  if (newValue === true) {
    nextTick(() => {
      searchInputRef.value?.focus();
    });
  }
});

const setInputDebounced = useDebounceFn((event: Event): void => {
  const target = event.target as HTMLInputElement;
  emits('update:modelValue', target.value);
}, debounce);

const toggleInput = (): void => {
  isExpanded.value = !isExpanded.value;
};

const clearInput = (): void => {
  toggleInput();
  emits('update:modelValue', '');
};
</script>

<template>
  <div
    class="flex items-center space-x-2 md:relative md:w-max"
    :class="isExpanded ? 'absolute left-0 top-0 flex w-full' : 'relative'"
  >
    <button class="h-6 w-6 cursor-pointer select-none" aria-label="Open searchable input" @click.enter="toggleInput">
      <MagnifyingGlassIcon class="text-grey-800 dark:text-white" />
    </button>
    <TransitionGroup>
      <div
        key="placeholderSearch"
        ref="labelRef"
        class="font-inter hidden transform cursor-pointer select-none overflow-hidden font-bold transition-all duration-200 md:block dark:text-white"
        :style="ready ? { width: !isExpanded ? labelElementWidth + 2 + 'px' : '0px' } : {}"
        @click.enter="isExpanded = !isExpanded"
      >
        {{ label }}
      </div>
      <div
        key="searchInputHolder"
        class="flex flex-grow items-center space-x-2 overflow-hidden transition-all duration-200"
        :class="[isExpanded ? 'w-[calc(100vw-65px)] md:w-60' : 'w-0']"
      >
        <div v-if="isExpanded" class="bg-grey-800 absolute h-[1.125rem] w-px dark:bg-white"></div>
        <div class="h-6 flex-grow transition-all duration-200" :class="{ 'opacity-0': !isExpanded }">
          <input
            ref="searchInputRef"
            class="placeholder:text-grey-600 dark:placeholder:text-grey-400 w-full bg-transparent outline-none md:w-[12.5rem] dark:text-white"
            type="text"
            :value="modelValue"
            :placeholder="label"
            title="Search input"
            aria-expanded
            @input="setInputDebounced"
            @keydown.esc="clearInput"
          />
        </div>
        <button class="h-6 w-6" aria-label="Close searchable input" @click="clearInput">
          <XMarkIcon
            class="text-grey-800 md:text-grey-400 md:hover:text-grey-800 dark:hover:text-grey-400 duration-200 dark:text-white"
          />
        </button>
      </div>
    </TransitionGroup>
  </div>
</template>
