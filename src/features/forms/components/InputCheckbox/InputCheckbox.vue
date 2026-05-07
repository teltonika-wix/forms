<script setup lang="ts">
import { isSlotEmpty } from "src/vue-utils";
import {
  Checkbox,
  type CheckboxValueChange,
  DEFAULT_CHECKBOX_PROPS,
} from "src/legacy/core/components/form/Checkbox";
import { CheckboxWrapper } from "src/legacy/core/components/form/CheckboxWrapper";
import { ErrorMessage, ErrorMessageIcon } from "src/legacy/core/components/form/ErrorMessage";
import { inputCheckboxTheme } from "./inputCheckboxTheme";
import type { InputCheckboxEmits, InputCheckboxProps } from "./types";
import { computed, useSlots } from "vue";

const {
  value = DEFAULT_CHECKBOX_PROPS["value"],
  size = DEFAULT_CHECKBOX_PROPS["size"],
  id,
  dataTestId,
  ...restProps
} = defineProps<InputCheckboxProps>();
const allProps = { ...restProps, value, size, id, dataTestId };
const emits = defineEmits<InputCheckboxEmits>();

const classes = computed(() => {
  return inputCheckboxTheme(inputCheckboxTheme);
});

const valueChangeHandler: CheckboxValueChange = (...params) => {
  emits("onValueChange", ...params);
};

const slots = useSlots();
</script>

<template>
  <CheckboxWrapper :id="id" :size="size" :data-test-id="dataTestId">
    <template #checkbox>
      <Checkbox v-bind="allProps" :class="classes.checkbox()" @onValueChange="valueChangeHandler" />
    </template>
    <template #label>
      <slot name="label" />
    </template>
    <template v-if="!isSlotEmpty(slots.errorMessage)" #errorMessage>
      <ErrorMessageIcon class="mx-auto mt-1" /><ErrorMessage
        ><slot name="errorMessage"
      /></ErrorMessage>
    </template>
  </CheckboxWrapper>
</template>

<style scoped></style>
