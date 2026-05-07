<script setup lang="ts">
import { Text } from "../Text";
import { type LabelVariants, labelDefaultVariants, labelTheme } from "./labelTheme";
import { computed } from "vue";

const { color = labelDefaultVariants["color"] } = defineProps<LabelVariants>();

const classes = computed(() => labelTheme({ color }));
</script>

<template>
  <div :class="classes">
    <Text size="s">
      <slot />
    </Text>
  </div>
</template>
