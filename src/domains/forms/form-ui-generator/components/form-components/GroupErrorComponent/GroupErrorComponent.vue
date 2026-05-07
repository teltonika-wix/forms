<script setup lang="ts">
import { ErrorMessage, ErrorMessageIcon } from "src/legacy/core/components/form/ErrorMessage";
import { useFormStore } from "../../../stores/formStore";
import type { BaseFormComponentProps } from "../../../types";
import { mapToSpacingClasses } from "../../../utils/mapToSpacingClasses";
import { computed } from "vue";

const { formInputData, formCode } = defineProps<BaseFormComponentProps>();
const { translations, attributes, props } = formInputData;
const { name } = attributes;
const classes = mapToSpacingClasses(props?.spacing);
const { formInputsState } = useFormStore(formCode);
const errorMessage = computed(() => formInputsState?.[name]?.errorMessage);
</script>

<template>
  <div v-if="errorMessage" class="mt-1 grid grid-cols-[min-content_auto] gap-x-1">
    <ErrorMessageIcon class="mx-auto mt-1" />
    <ErrorMessage :class="classes">{{ translations.content }}</ErrorMessage>
  </div>
</template>
