<script setup lang="ts">
import { isString } from "src/utilities";
import { InputField, type InputFieldValueChange } from "src/features/forms/components/InputField";
import { useFormStore } from "../../../stores/formStore";
import type { BaseFormComponentProps } from "../../../types";
import { mapToSpacingClasses } from "../../../utils/mapToSpacingClasses";
import { computed } from "vue";

const { formInputData, formCode } = defineProps<BaseFormComponentProps>();
const { translations, attributes, props } = formInputData;
const { id, name } = attributes;
const classes = mapToSpacingClasses(props?.spacing);
const { formInputsState, updateFormInputValue } = useFormStore(formCode);

const inputValue = computed(() => formInputsState?.[name]?.value);
const errorMessage = computed(() => formInputsState?.[name]?.errorMessage);

const inputValueChange: InputFieldValueChange = (_event, value) => {
  const newValue = value || "";
  updateFormInputValue(name, newValue);
};
</script>

<template>
  <InputField
    :id="id"
    :name="name"
    :inputValue="isString(inputValue, true) ? inputValue : ''"
    :label="translations.label"
    :error="errorMessage"
    :class="classes"
    @onValueUpdate="inputValueChange"
  />
</template>
