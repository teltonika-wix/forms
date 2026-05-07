<script setup lang="ts">
import { headingTheme } from "./headingTheme";
import type { HeadingProps } from "./types";
import { computed } from "vue";

const { size, weight, tag = "div" } = defineProps<HeadingProps>();

const classes = computed(() => {
  return headingTheme({
    size: size,
    weight: weight,
  });
});
</script>

<template>
  <component :is="tag" :class="classes"><slot /></component>
</template>
