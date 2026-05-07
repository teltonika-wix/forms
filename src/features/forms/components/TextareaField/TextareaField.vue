<script setup lang="ts">
import { Field } from "src/legacy/core/components/form/Field";
import { InputHelper } from "src/legacy/core/components/form/InputHelper";
import { extractInputValue } from "../utils/extractInputValue";
import type { TextareaFieldEmits, TextareaFieldProps } from "./types";

const {
  inputValue,
  error,
  maxLength,
  label,
  comment,
  disabled,
  readonly,
  id,
  name,
  rows = 4,
  placeholder,
} = defineProps<TextareaFieldProps>();
const emits = defineEmits<TextareaFieldEmits>();

const valueUpdateHandler = (event: Event): void => {
  const newValue = extractInputValue(event);
  emits("onValueUpdate", event, newValue);
};
</script>

<template>
  <div>
    <Field
      :error="error"
      :label="label"
      :comment="comment"
      :valueLength="inputValue?.length"
      :disabled="disabled"
      :readonly="readonly"
      :labelFor="id"
    >
      <textarea
        :id="id"
        :name="name"
        :rows="rows"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly"
        :maxLength="maxLength"
        :value="inputValue"
        class="block w-full resize-none appearance-none bg-transparent text-current outline-none hover:resize-y"
        @input="valueUpdateHandler"
      ></textarea>
    </Field>
    <InputHelper
      v-if="error || maxLength"
      class="mt-1"
      :errorMessage="error"
      :valueLength="inputValue?.length"
      :maxValueLength="maxLength"
    />
  </div>
</template>
