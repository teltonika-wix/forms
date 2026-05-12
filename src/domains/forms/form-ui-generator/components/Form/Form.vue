<script setup lang="ts">
import { useFormStore } from "../../stores/formStore";
import { extractFormMessages } from "../../utils/extractFormMessages";
import { FormSubmitError } from "../FormSubmitError";
import { FormCompletedScreen } from "../form-completion-screens";
import { SourceComponent } from "../form-components";
import { useFormSubmit } from "./composables/useFormSubmit";
import type { FormProps } from "./types";
import { addFormInputsToStore } from "./utils/addFormInputsToStore";
import { formComponentsMap } from "./utils/formComponentsMap";
import { getBrowserIpInfo } from "src/domains/forms/forms-kit/FormDataService/ipInfo";
import { onMounted, provide, ref } from "vue";
import type { FormSubmitEventHandler } from "./composables/types";
import { Button } from "src/legacy/core/components/Button";

const {
  formUrlParameters,
  formRenderingData,
  clientFullUrl,
  recaptchaSiteKey,
  submitButtonText,
  formWebClientEndpoint,
  isDev,
} = defineProps<FormProps>();
const emit = defineEmits<{
  onFormSubmitEvent: Parameters<FormSubmitEventHandler>;
}>();

const { form: formCode } = formUrlParameters;
const { addFormMessage, getIsFormActive, updateFormInputValue } = useFormStore(formCode);
const formInputs = ref(formRenderingData.inputs);
const { submitHandler, isSubmitting } = useFormSubmit({
  formCode,
  recaptchaSiteKey,
  formUrlParameters,
  formWebClientEndpoint,
  isDev,
  formSubmitEventHandler: (...params) => emit("onFormSubmitEvent", ...params),
});

provide("apiUrl", formWebClientEndpoint);

const getFormInputKey = (
  formInputData: {
    component: string;
    defaultValue?: string;
    attributes?: { name?: string };
  },
  index: number,
) => {
  return `${formInputData.component}-${formInputData.attributes?.name || index}-${formInputData.defaultValue || ""}`;
};

onMounted(() => {
  addFormInputsToStore({ formCode, formInputs: formInputs.value });
  const { successMessageData, errorMessageData } = extractFormMessages(formRenderingData);
  addFormMessage("successfullySent", successMessageData);
  addFormMessage("failedSent", errorMessageData);

  const locationInputs = formInputs.value.filter((input) => {
    return input.component === "LocationSelectComponent" || input.component === "SelectInput";
  });

  if (!locationInputs.length) {
    return;
  }

  void getBrowserIpInfo({ formWebClientEndpoint, isDev }).then((ipInfo) => {
    const countryName = ipInfo?.countryName;

    if (!countryName) {
      return;
    }

    formInputs.value = formInputs.value.map((input) => {
      if (input.component !== "LocationSelectComponent" && input.component !== "SelectInput") {
        return input;
      }

      const inputName = input.attributes?.name;

      if (inputName) {
        updateFormInputValue(inputName, countryName);
      }

      return { ...input, defaultValue: countryName };
    });
  });
});

const isFormActive = getIsFormActive();
</script>

<template>
  <form v-if="isFormActive" class="w-full" @submit.prevent="submitHandler">
    <template
      v-for="(formInputData, index) in formInputs"
      :key="getFormInputKey(formInputData, index)"
    >
      <SourceComponent
        v-if="formInputData.component === 'SourceComponent'"
        :formInputData="formInputData"
        :formCode="formCode"
        :clientFullUrl="clientFullUrl"
      />
      <component
        :is="formComponentsMap[formInputData.component]"
        v-else
        :formInputData="formInputData"
        :formCode="formCode"
      />
    </template>
    <FormSubmitError :formCode="formCode" class="mb-4 mt-2" />
    <Button color="primary" size="medium" type="submit" :disabled="isSubmitting" class="mt-6">
      {{ submitButtonText }}
    </Button>
  </form>
  <FormCompletedScreen v-else :formCode="formCode" :formInputs="formInputs" />
</template>
