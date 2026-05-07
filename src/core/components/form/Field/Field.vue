<script setup lang="ts">
import { tv } from "tailwind-variants";
import { InfoTooltip } from "../InfoTooltip";
import { InputLabel } from "../InputLabel";
import { FIELD_THEME, type FieldThemePaddingsKeys } from "./fieldTheme";
import type { FieldColorThemingProps, FieldProps } from "./types";
import { getColor } from "./utils/getColor";
import { getPaddings } from "./utils/getPaddings";
import { computed, toRefs } from "vue";

const props = defineProps<FieldProps>();
const { error, disabled, readonly, label, labelFor, comment } = toRefs(props);
const paddings: FieldThemePaddingsKeys = getPaddings(!!label.value);
const fieldTheme = tv(FIELD_THEME);
const fieldClasses = computed(() => {
  const colorParams: FieldColorThemingProps = {
    error: !!error.value,
    disabled: disabled.value,
    readonly: readonly.value,
  };

  const color = getColor(colorParams);

  return fieldTheme({ color: color, paddings });
});
</script>

<template>
  <div :class="fieldClasses">
    <div class="flex">
      <div class="peer flex flex-1 flex-col-reverse">
        <div class="peer w-full">
          <slot></slot>
        </div>
        <InputLabel v-if="label" :labelFor="labelFor" :error="!!error" :disabled="disabled">{{
          label
        }}</InputLabel>
      </div>
      <InfoTooltip v-if="comment" :content="comment" class="mt-2 h-fit peer-has-[textarea]:mt-4" />
      <slot name="right"></slot>
    </div>
  </div>
</template>
