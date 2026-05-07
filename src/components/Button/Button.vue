<script setup lang="ts">
import { isSlotEmpty } from "src/vue-utils";
import { buttonTheme, defaultVariants } from "./buttonTheme";
import type { ButtonProps } from "./types";
import { computed, ref, useSlots } from "vue";

const {
  color = defaultVariants["color"],
  size = defaultVariants["size"],
  width = defaultVariants["width"],
  disabled = defaultVariants["disabled"],
  type = "button",
} = defineProps<ButtonProps>();
const slots = useSlots();
const buttonRef = ref<HTMLButtonElement | null>(null);

const classes = computed(() =>
  buttonTheme({
    size: size,
    color: color,
    width: width,
    isButtonText: !isSlotEmpty(slots.default),
    disabled: disabled,
  }),
);

defineExpose({ buttonRef });
</script>

<template>
  <button ref="buttonRef" :class="classes.base()" :type="type" :disabled="disabled">
    <span v-if="!isSlotEmpty(slots.startIcon)" :class="classes.startIcon()">
      <slot name="startIcon" class="text-inherit"></slot>
    </span>
    <span v-if="!isSlotEmpty(slots.default)" :class="classes.buttonText()">
      <slot />
    </span>
    <span v-if="!isSlotEmpty(slots.endIcon)" :class="classes.endIcon()">
      <slot name="endIcon"></slot>
    </span>
  </button>
</template>

<style scoped></style>
