<script setup lang="ts">
import { SelectMenu, type SelectMenuItemChange } from 'src/features/forms/components/SelectMenu';
import { useFormStore } from '../../../stores/formStore';
import type { BaseFormComponentProps } from '../../../types';
import { mapToSpacingClasses } from '../../../utils/mapToSpacingClasses';
import { extractSelectMenuOptions } from './utils/extractSelectMenuOptions';
import { switchMenuOptionsSet } from './utils/switchMenuOptionsSet';
import { computed } from 'vue';

const { formInputData, formCode } = defineProps<BaseFormComponentProps>();
const { attributes, translations, options, props, defaultValue } = formInputData || {};
const { label } = translations || {};
const { spacing, relation, isSearchable = false } = props || {};
const { id, name } = attributes || {};
const { relatedFieldName } = relation || {};

const { menuOptions, defaultOption } = extractSelectMenuOptions({ options, defaultValue });
const classes = mapToSpacingClasses(spacing);
const { formInputsState, updateFormInputValue } = useFormStore(formCode);
const actualMenuOptions = switchMenuOptionsSet({ menuOptions, relatedFieldName, formInputsState });
const errorMessage = computed(() => formInputsState?.[name]?.errorMessage);

const itemSelectHandler: SelectMenuItemChange = (_event, item) => {
  updateFormInputValue(name, item.value);
};
</script>

<template>
  <SelectMenu
    v-if="actualMenuOptions.length"
    :id="id"
    :defaultValue="defaultOption"
    :selectMenuOptions="actualMenuOptions"
    :name="name"
    :label="label"
    :class="classes"
    :error="errorMessage"
    :search="isSearchable"
    @onItemSelect="itemSelectHandler"
  />
</template>
