<script setup lang="ts">
import { ErrorMessage } from 'src/legacy/core/components/form/ErrorMessage';
import { useFormStore } from '../../stores/formStore';
import type { FormSubmitErrorProps } from './types';
import { computed } from 'vue';

const { formCode } = defineProps<FormSubmitErrorProps>();
const { formMessagesState } = useFormStore(formCode);
const errorMessage = computed(() => formMessagesState?.submitError);
</script>

<template>
  <ErrorMessage v-if="errorMessage">{{ errorMessage }}</ErrorMessage>
</template>
