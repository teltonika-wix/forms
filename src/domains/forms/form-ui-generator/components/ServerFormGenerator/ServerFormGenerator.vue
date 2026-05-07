<script setup lang="ts">
import { useServerFormRenderingData } from "../../composables/useServerFormRenderingData";
import { Form, type FormSubmitEventHandler } from "../Form";
import { StaticFailureScreen } from "../form-completion-screens";
import type { ServerFormGeneratorProps } from "./types";

const {
  clientIp,
  formUrlParameters,
  formSecrets,
  clientFullUrl,
  formWebClientEndpoint,
  recaptchaSiteKey,
  submitButtonText,
} = defineProps<ServerFormGeneratorProps>();

const emit = defineEmits<{
  onFormSubmitEvent: Parameters<FormSubmitEventHandler>;
}>();

const { state: formRenderingData, isLoading } = useServerFormRenderingData({
  clientIp,
  formUrlParameters,
  formSecrets,
});

const onFormSubmitEvent: FormSubmitEventHandler = (...parameters) =>
  emit("onFormSubmitEvent", ...parameters);
</script>

<template>
  <Form
    v-if="!isLoading && formRenderingData"
    :recaptchaSiteKey="recaptchaSiteKey"
    :formUrlParameters="formUrlParameters"
    :clientFullUrl="clientFullUrl"
    :formRenderingData="formRenderingData"
    :submitButtonText="submitButtonText"
    :formWebClientEndpoint="formWebClientEndpoint"
    @onFormSubmitEvent="onFormSubmitEvent"
  />
  <StaticFailureScreen v-else />
</template>
