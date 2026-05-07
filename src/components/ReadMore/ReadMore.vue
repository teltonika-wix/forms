<script setup lang="ts">
import { ChevronDown16PxIcon } from "src/components/Icons";
import { Text } from "../Text";
import { readMoreTheme } from "./readMoreTheme";
import type { ReadMoreProps } from "./types";
import { computed } from "vue";

const { type = "withArrow", textOpened, textClosed, linesShown = 4 } = defineProps<ReadMoreProps>();

const isOpened = defineModel({
  default: false,
});

const toggle = () => {
  isOpened.value = !isOpened.value;
};

const classes = computed(() => {
  return readMoreTheme({
    type,
  });
});

const mainText = computed(() => {
  if (isOpened.value) {
    return textOpened;
  }

  return textClosed;
});

const textBlockStyles = computed(() => {
  if (isOpened.value) {
    return {};
  }

  return {
    "-webkit-line-clamp": linesShown,
  };
});
</script>

<template>
  <div>
    <div class="text-block overflow-hidden text-ellipsis" :style="textBlockStyles">
      <slot />
    </div>

    <Text tabindex="0" :class="classes" @click="toggle">
      {{ mainText }}

      <ChevronDown16PxIcon
        v-if="type === 'withArrow'"
        :class="{
          'rotate-180': isOpened,
        }"
      />
    </Text>
  </div>
</template>

<style scoped>
.text-block {
  display: -webkit-box;
  -webkit-box-orient: vertical;
}
</style>
