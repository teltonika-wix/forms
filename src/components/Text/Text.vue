<script setup lang="ts">
import { textTheme } from './textTheme';
import type { TextProps } from './types';
import { computed } from 'vue';

const { size, weight, labelFor, tag = 'p' } = defineProps<TextProps>();

const classes = computed(() => {
  return textTheme({ size, weight });
});
</script>

<template>
  <component :is="tag" :for="labelFor" :class="classes"><slot /></component>
</template>

<style scoped></style>
