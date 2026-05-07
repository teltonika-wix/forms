<script setup lang="ts">
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/vue/24/outline';
import { useDebounceFn } from '@vueuse/core';
import { searchTheme } from './searchTheme';
import { type SearchEmits, type SearchProps } from './types';
import { computed } from 'vue';

const { label = 'Search', debounce = 0, size = 'large', modelValue } = defineProps<SearchProps>();

const emits = defineEmits<SearchEmits>();

const setInputDebounced = useDebounceFn((event: Event): void => {
  const target = event.target as HTMLInputElement;
  emits('update:modelValue', target.value);
}, debounce);

const clearInput = (): void => {
  emits('update:modelValue', '');
};

const classes = computed(() =>
  searchTheme({
    size,
  }),
);
</script>

<template>
  <div class="flex w-full items-center space-x-2">
    <div class="cursor-pointer select-none" :class="classes.startIcon()">
      <MagnifyingGlassIcon class="text-grey-800" />
    </div>
    <div class="bg-grey-800 w-px" :class="classes.divider()"></div>
    <div class="w-full flex-grow" :class="classes.inputHeight()">
      <input
        class="placeholder:text-grey-600 w-full bg-transparent outline-none"
        :class="classes.bodyText()"
        type="text"
        enterkeyhint="search"
        :value="modelValue"
        :placeholder="label"
        title="Search input"
        @input="setInputDebounced"
        @keydown.esc="clearInput"
      />
    </div>
    <button :class="classes.closeIcon()" aria-label="Clear search input" @click.esc="clearInput">
      <XMarkIcon class="text-grey-800 md:text-grey-400 md:hover:text-grey-800 duration-200" />
    </button>
  </div>
</template>
