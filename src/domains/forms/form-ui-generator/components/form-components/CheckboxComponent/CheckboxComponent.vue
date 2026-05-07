<script setup lang="ts">
import type { CheckboxValueChange } from 'src/legacy/core/components/form/Checkbox';
import { InputCheckbox } from 'src/features/forms/components/InputCheckbox';
import { useFormStore } from '../../../stores/formStore';
import type { BaseFormComponentProps } from '../../../types';
import { mapToSpacingClasses } from '../../../utils/mapToSpacingClasses';
import { CheckboxLabel } from './components';
import { computed, ref } from 'vue';

const { formInputData, formCode } = defineProps<BaseFormComponentProps>();
const { translations, attributes, props } = formInputData;
const classes = mapToSpacingClasses(props?.spacing);
const { id, name } = attributes;
const { updateFormInputValue, formInputsState } = useFormStore(formCode);

const checkboxValue = ref(!!formInputsState?.[name]?.value);
const errorMessage = computed(() => formInputsState?.[name]?.errorMessage || '');

const checkboxValueChange: CheckboxValueChange = (_event, value) => {
  checkboxValue.value = value;
  updateFormInputValue(name, value);
};
</script>

<template>
  <InputCheckbox
    :id="id"
    :name="name"
    :value="checkboxValue"
    class="w-full"
    :class="classes"
    :error="!!errorMessage"
    @onValueChange="checkboxValueChange"
  >
    <template #label>
      <CheckboxLabel :labelText="translations.label" />
    </template>
    <template #errorMessage>{{ errorMessage }}</template>
  </InputCheckbox>
</template>
