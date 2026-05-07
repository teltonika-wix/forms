import { createApp, type App } from "vue";
import { BrowserFormGenerator } from "src/domains/forms/form-ui-generator/components/BrowserFormGenerator";
import { Form } from "src/domains/forms/form-ui-generator/components/Form";
import { FormCodes } from "src/domains/forms/forms-kit";
import { Spinner } from "src/components/Spinner";
import { wixFormsStyles } from "src/form-build/wix-forms-style";

const FORM_CODE_BY_TAG = {
  "contact-form": FormCodes.ContactForm,
  "contact-form-modal": FormCodes.ContactForm,
  "newsletter-form": FormCodes.NewsletterForm,
  "rms-quiz": FormCodes.RMSQuizForm,
} as const;

export type FormTagName = keyof typeof FORM_CODE_BY_TAG;

export type CreateFormWebElementOptions = {
  recaptchaSiteKey: string;
  formWebClientEndpoint: string;
  language: string;
  prefills?: Record<string, string>;
  isDev?: boolean;
  submitButtonText?: string;
  formCode?: FormCodes;
};

const WIX_FORMS_STYLE_SELECTOR = "style[data-wix-forms-custom-elements]";

const ensureGlobalStyles = () => {
  if (typeof document === "undefined") {
    return;
  }

  if (document.querySelector(WIX_FORMS_STYLE_SELECTOR)) {
    return;
  }

  const style = document.createElement("style");
  style.dataset.wixFormsCustomElements = "true";
  style.textContent = wixFormsStyles;
  document.head.appendChild(style);
};

const resolveFormCode = (tagName: string, explicitFormCode?: FormCodes): FormCodes => {
  if (explicitFormCode) {
    return explicitFormCode;
  }

  const mappedCode = FORM_CODE_BY_TAG[tagName as FormTagName];
  if (!mappedCode) {
    throw new Error(`Unsupported form tag name: ${tagName}`);
  }

  return mappedCode;
};

export const createFormWebElement = (
  options: CreateFormWebElementOptions,
): CustomElementConstructor => {
  return class WixFormElement extends HTMLElement {
    private app: App<Element> | null = null;

    connectedCallback() {
      if (this.app) {
        return;
      }

      ensureGlobalStyles();

      const formCode = resolveFormCode(this.localName, options.formCode);
      const mountNode = document.createElement("div");
      this.appendChild(mountNode);

      const app = createApp(BrowserFormGenerator, {
        recaptchaSiteKey: options.recaptchaSiteKey,
        submitButtonText: options.submitButtonText ?? "Submit",
        formWebClientEndpoint: options.formWebClientEndpoint,
        prefills: options.prefills,
        isDev: options.isDev,
        formUrlParameters: {
          language: options.language,
          form: formCode,
        },
      });

      app.component("Form", Form);
      app.component("Spinner", Spinner);
      app.mount(mountNode);

      this.app = app;
    }

    disconnectedCallback() {
      this.app?.unmount();
      this.app = null;
      this.innerHTML = "";
    }
  };
};
