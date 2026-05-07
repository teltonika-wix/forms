<script setup lang="ts">
import type { FormRenderingDataResponse } from "src/domains/forms/forms-kit";
import { useBrowserFormRenderingData } from "../../composables/useBrowserFormRenderingData";
import type { FormSubmitEventHandler } from "../Form";

import { StaticFailureScreen } from "../form-completion-screens";
import type { BrowserFormGeneratorProps } from "./types";
import { computed } from "vue";

const {
  formUrlParameters,
  recaptchaSiteKey,
  submitButtonText,
  formWebClientEndpoint,
  prefills,
  isDev,
} = defineProps<BrowserFormGeneratorProps>();

const emit = defineEmits<{
  onFormSubmitEvent: Parameters<FormSubmitEventHandler>;
}>();

const { isLoading, formRenderingData, clientFullUrl } =
  useBrowserFormRenderingData({
    formUrlParameters,
    formWebClientEndpoint,
    isDev,
  });

const prefilledFormRenderingData = computed<FormRenderingDataResponse>(() => {
  if (prefills) {
    formRenderingData.value?.inputs.forEach((inputStructure) => {
      if (Object.keys(prefills).includes(inputStructure.attributes.name)) {
        inputStructure.defaultValue =
          prefills[inputStructure.attributes.name] ?? "";
      }
    });
  }

  return formRenderingData.value!;
});

const onFormSubmitEvent: FormSubmitEventHandler = (...parameters) =>
  emit("onFormSubmitEvent", ...parameters);
</script>

<template>
  <div
    v-if="isLoading"
    class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform"
  >
    <Spinner size="medium" />
  </div>
  <Form
    v-else-if="!isLoading && formRenderingData"
    :recaptchaSiteKey="recaptchaSiteKey"
    :formUrlParameters="formUrlParameters"
    :clientFullUrl="clientFullUrl"
    :formRenderingData="prefilledFormRenderingData"
    :submitButtonText="submitButtonText"
    :formWebClientEndpoint="formWebClientEndpoint"
    :isDev="isDev"
    @onFormSubmitEvent="onFormSubmitEvent"
  />
  <StaticFailureScreen v-else />
</template>
