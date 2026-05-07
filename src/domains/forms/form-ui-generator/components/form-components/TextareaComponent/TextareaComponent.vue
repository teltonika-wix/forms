<script setup lang="ts">
import { isString } from "src/utilities";
import {
  TextareaField,
  type TextareaValueChange,
} from "src/features/forms/components/TextareaField";
import { useFormStore } from "../../../stores/formStore";
import type { BaseFormComponentProps } from "../../../types";
import { mapToSpacingClasses } from "../../../utils/mapToSpacingClasses";
import { computed } from "vue";

const { formInputData, formCode } = defineProps<BaseFormComponentProps>();
const { translations, attributes, props } = formInputData;
const { id, name, max, rows } = attributes;
const classes = mapToSpacingClasses(props?.spacing);
const { formInputsState, updateFormInputValue } = useFormStore(formCode);

const inputValue = computed(() => formInputsState?.[name]?.value);
const errorMessage = computed(() => formInputsState?.[name]?.errorMessage);

const textareaValueChange: TextareaValueChange = (_event, value) => {
  const newValue = value || "";
  updateFormInputValue(name, newValue);
};
</script>

<template>
  <div :class="classes">
    <TextareaField
      :id="id"
      :name="name"
      :inputValue="isString(inputValue, true) ? inputValue : ''"
      :maxLength="max"
      :rows="rows"
      :label="translations.label"
      :error="errorMessage"
      @onValueUpdate="textareaValueChange"
    />
  </div>
</template>
