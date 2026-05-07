<script setup lang="ts">
import { selectMenuItemTheme } from './selectMenuItemTheme';
import type { SelectMenuItemProps } from './types';
import { computed } from 'vue';

const { isSelected } = defineProps<SelectMenuItemProps>();
const classes = computed(() =>
  selectMenuItemTheme({
    isSelected,
  }),
);
</script>

<template>
  <li :class="classes"><slot /></li>
</template>
