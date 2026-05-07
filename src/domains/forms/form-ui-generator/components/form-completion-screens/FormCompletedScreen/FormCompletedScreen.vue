<script setup lang="ts">
import { useFormStore } from '../../../stores/formStore';
import FailureScreen from '../FailureScreen.vue';
import SuccessScreen from '../SuccessScreen.vue';
import type { FormCompletedScreenProps } from './types';
import { computed, onMounted } from 'vue';

const { formCode, formInputs } = defineProps<FormCompletedScreenProps>();
const { formMessagesState, resetFormInputs } = useFormStore(formCode);

const messageData = computed(() => {
  if (formMessagesState?.successfullySent.isActive) {
    const { title, message } = formMessagesState.successfullySent;

    return { state: 'success', title, message };
  }

  if (formMessagesState?.failedSent.isActive) {
    const { title, message } = formMessagesState.failedSent;

    return { state: 'error', title, message };
  }

  return { state: 'none', title: '', message: '' };
});

onMounted(() => {
  if (messageData.value.state === 'success') {
    resetFormInputs(formInputs);
  }
});
</script>

<template>
  <template v-if="messageData.state !== 'none'">
    <FailureScreen v-if="messageData.state === 'error'" :title="messageData.title" :message="messageData.message" />
    <SuccessScreen v-else :title="messageData.title" :message="messageData.message" />
  </template>
</template>
