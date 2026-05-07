<script setup lang="ts">
import { DEFAULT_CHECKBOX_PROPS } from "./checkboxConstants";
import { checkboxTheme } from "./checkboxTheme";
import type { CheckboxEmits, CheckboxProps } from "./types";
import { useCheckbox } from "./useCheckbox";
import { computed } from "vue";

const {
  size = DEFAULT_CHECKBOX_PROPS["size"],
  value = DEFAULT_CHECKBOX_PROPS["value"],
  error,
  id,
  name,
} = defineProps<CheckboxProps>();
const emits = defineEmits<CheckboxEmits>();
const { isChecked, handleChange } = useCheckbox({
  value,
  onChange: (event, value) => emits("onValueChange", event, value),
});

const classes = computed(() => {
  return checkboxTheme({ size, error });
});
</script>

<template>
  <div :class="classes.base()">
    <input
      :id="id"
      :name="name"
      type="checkbox"
      :class="classes.input()"
      :value="isChecked"
      :checked="isChecked"
      @change="handleChange"
    />
    <svg
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      :class="classes.svgChecked()"
    >
      <rect width="16" height="16" rx="4" fill="currentColor" />
      <path
        d="M3.33331 8.66669L5.99998 11.3334L12.6666 4.66669"
        stroke="white"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
    <svg
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      :class="classes.svgUnchecked()"
    >
      <rect x="0.5" y="0.5" width="15" height="15" rx="3.5" stroke="currentColor" />
    </svg>
  </div>
</template>

<style scoped></style>
