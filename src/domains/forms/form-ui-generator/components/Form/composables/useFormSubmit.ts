import { type BrowserFormRenderingParams, FormDataService } from "src/domains/forms/forms-kit";
import { isSuccessfulStatusCode } from "src/utilities";
import { useFormStore } from "../../../stores/formStore";
import { FormValidationError } from "../../../utils/FormValidationError";
import { createFormData } from "../utils/createFormData";
import { updateFormInputErrorStates } from "../utils/updateFormInputErrors";
import type { FormSubmitEventHandler } from "./types";
import { type Ref, ref } from "vue";

export type UseFormSubmitParams = BrowserFormRenderingParams & {
  formCode: string;
  recaptchaSiteKey: string;
  formSubmitEventHandler: FormSubmitEventHandler;
};

export type UseFormSubmitReturn = {
  submitHandler: (event: Event) => Promise<void>;
  isSubmitting: Ref<boolean>;
};

export const useFormSubmit = ({
  formCode,
  recaptchaSiteKey,
  formUrlParameters,
  formSubmitEventHandler,
  formWebClientEndpoint,
  isDev,
}: UseFormSubmitParams): UseFormSubmitReturn => {
  const fallbackSubmitErrorMessage = "Failed to submit form. Please try again later!";
  const isSubmitting = ref(false);
  const activeAbortController = ref<AbortController | null>(null);

  const isAbortError = (error: unknown): boolean => {
    if (activeAbortController.value?.signal.aborted) {
      return true;
    }

    if (typeof DOMException !== "undefined" && error instanceof DOMException) {
      return error.name === "AbortError";
    }

    return error instanceof Error && error.name === "AbortError";
  };

  const submitHandler = async (event: Event): Promise<void> => {
    activeAbortController.value?.abort();
    const abortController = new AbortController();
    activeAbortController.value = abortController;
    isSubmitting.value = true;
    formSubmitEventHandler({ status: "beforeSubmit" });
    const { setFormCompleted, addFormMessage } = useFormStore(formCode);
    addFormMessage("submitError", "");

    try {
      const { formData, recaptchaKey } = await createFormData({
        event,
        recaptchaSiteKey,
      });
      const response = await FormDataService.sendFormData({
        formData,
        formUrlParameters,
        formWebClientEndpoint,
        isDev,
        signal: abortController.signal,
      });
      const { errors } = await FormDataService.getValidationData(response.clone());

      if (errors && Object.keys(errors).length > 0) {
        updateFormInputErrorStates({ formCode, errors, recaptchaKey });
        formSubmitEventHandler({ status: "error", errors, formData });

        return;
      }

      if (isSuccessfulStatusCode(response?.status)) {
        setFormCompleted();
        formSubmitEventHandler({
          status: "success",
          formCode,
          formUrlParameters,
          formData,
        });

        return;
      }

      if (!errors || Object.keys(errors).length === 0) {
        addFormMessage("submitError", fallbackSubmitErrorMessage);
        formSubmitEventHandler({ status: "unexpectedError", error: {} });

        return;
      }
    } catch (error) {
      if (isAbortError(error)) {
        return;
      }

      formSubmitEventHandler({ status: "unexpectedError", error });

      if (error instanceof FormValidationError) {
        addFormMessage("submitError", error.message);

        return;
      }

      addFormMessage("submitError", fallbackSubmitErrorMessage);

      return;
    } finally {
      if (activeAbortController.value === abortController) {
        activeAbortController.value = null;
        isSubmitting.value = false;
      }
    }
  };

  return { submitHandler, isSubmitting };
};
