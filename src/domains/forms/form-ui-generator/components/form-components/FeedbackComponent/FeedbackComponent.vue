<script setup lang="ts">
import { Feedback } from 'src/legacy/core/components/form/Feedback';
import { useFormStore } from '../../../stores/formStore';
import type { BaseFormComponentProps } from '../../../types';
import { mapToSpacingClasses } from '../../../utils/mapToSpacingClasses';
import { computed, onMounted, ref, watch } from 'vue';

const { formInputData, formCode } = defineProps<BaseFormComponentProps>();
const { attributes, props } = formInputData;
const { id, name } = attributes;
const classes = mapToSpacingClasses(props?.spacing);
const { formInputsState, updateFormInputValue } = useFormStore(formCode);

const inputValue = ref<number>(0);
const errorMessage = computed(() => formInputsState?.[name]?.errorMessage);

onMounted(() => {
  if (typeof formInputsState?.[name]?.value === 'string') return parseInt(formInputsState?.[name]?.value);

  if (typeof formInputsState?.[name]?.value === 'number') return formInputsState?.[name]?.value;
});

watch(
  () => inputValue.value,
  (newValue) => {
    inputValueChange(newValue);
  },
);

const inputValueChange = (value?: number) => {
  const newValue = value || '';
  updateFormInputValue(name, `${newValue}`);
};
</script>

<template>
  <Feedback :id="id" v-model.sync="inputValue" :class="classes" :error="errorMessage" :name="name" />
</template>
