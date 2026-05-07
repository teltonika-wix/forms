<script setup lang="ts">
import { dashesBySize, spinnerSizes, strokesBySize } from "./spinnerTheme";
import type { SpinnerProps } from "./types";
import { computed } from "vue";

const { size = "small" } = defineProps<SpinnerProps>();

const spinnerSize = computed<number>(() => {
  return spinnerSizes[size];
});

const halfSize = computed<number>(() => {
  return spinnerSize.value / 2;
});

const strokeWidth = computed<number>(() => {
  return strokesBySize[size];
});

const strokeDashArray = computed<string>(() => {
  return dashesBySize[size];
});

const radius = computed<number>(() => {
  return halfSize.value - strokeWidth.value / 2;
});
</script>

<template>
  <svg
    :width="spinnerSize"
    :height="spinnerSize"
    :viewBox="`0 0 ${spinnerSize} ${spinnerSize}`"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle
      :cx="halfSize"
      :cy="halfSize"
      :r="radius"
      fill="transparent"
      :stroke-width="strokeWidth"
      class="stroke-grey-200"
      opacity="20"
    />
    <circle
      class="origin-center animate-spin stroke-blue-600"
      :cx="halfSize"
      :cy="halfSize"
      :r="radius"
      fill="none"
      :stroke-width="strokeWidth"
      :stroke-dasharray="strokeDashArray"
      stroke-dashoffset="0"
      stroke-linecap="round"
    />
  </svg>
</template>
