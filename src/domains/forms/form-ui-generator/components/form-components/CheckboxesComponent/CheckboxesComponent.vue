<script setup lang="ts">
import { Text } from "src/legacy/core/components/Text";
import { InputCheckbox } from "src/features/forms/components/InputCheckbox";
import type { BaseFormComponentProps } from "../../../types";
import { mapToSpacingClasses } from "../../../utils/mapToSpacingClasses";
import { CheckboxLabel } from "../CheckboxComponent/components";
import { ref } from "vue";

const { formInputData } = defineProps<BaseFormComponentProps>();
const { attributes, options, props, translations } = formInputData;
const classes = mapToSpacingClasses(props?.spacing);

const selectedCheckboxes = ref<string[]>([]);

const checkboxValueChange = (_: Event, value: string): void => {
  if (selectedCheckboxes.value.includes(value)) {
    selectedCheckboxes.value = selectedCheckboxes.value.filter((item) => item !== value);

    return;
  }

  selectedCheckboxes.value.push(value);
};
</script>

<template>
  <div class="mb-6 md:inline-block md:w-2/4 md:pr-6" :class="classes">
    <Text v-if="translations.label" weight="bold" class="mb-2 text-blue-800">{{
      translations.label
    }}</Text>
    <input
      v-for="selected in selectedCheckboxes"
      :key="selected"
      type="text"
      class="hidden"
      :name="attributes.name"
      :value="selected"
    />
    <InputCheckbox
      v-for="option in options"
      :id="`${attributes.id}-${option.key}`"
      :key="`${attributes.id}-${option.key}`"
      :value="selectedCheckboxes.includes(option.key)"
      @onValueChange="(event: Event) => checkboxValueChange(event, option.key)"
    >
      <template #label>
        <CheckboxLabel :labelText="option.content" />
      </template>
    </InputCheckbox>
  </div>
</template>
