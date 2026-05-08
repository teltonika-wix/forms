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

type FormTagName = keyof typeof FORM_CODE_BY_TAG;

type CreateFormWebElementOptions = {
  recaptchaSiteKey: string;
  formWebClientEndpoint: string;
  language: string;
  prefills?: Record<string, string>;
  isDev?: boolean;
  submitButtonText?: string;
  formCode?: FormCodes;
};

const WIX_FORMS_STYLE_SELECTOR = "style[data-wix-forms-custom-elements]";
const WIX_FORMS_TAG_SELECTORS = Object.keys(FORM_CODE_BY_TAG).join(", ");
const WIX_FORMS_ROOT_SELECTORS = Object.keys(FORM_CODE_BY_TAG)
  .map((tagName) => `${tagName} .wix-forms-root`)
  .join(", ");
const WIX_FORMS_RESET_STYLES = `
${WIX_FORMS_TAG_SELECTORS} {
  all: initial;
  display: block;
}

${WIX_FORMS_ROOT_SELECTORS} {
  color: initial;
  cursor: auto;
  direction: ltr;
  font-family: Inter, sans-serif;
  font-size: 16px;
  font-style: normal;
  font-variant: normal;
  font-weight: 400;
  letter-spacing: normal;
  line-height: 1.5;
  text-align: initial;
  text-indent: 0;
  text-transform: none;
  white-space: normal;
  word-spacing: normal;
}

${WIX_FORMS_ROOT_SELECTORS}, ${WIX_FORMS_ROOT_SELECTORS} * {
  box-sizing: border-box;
}

.wix-forms-root * {
  all: revert-layer;
}

.wix-forms-root input, .wix-forms-root textarea, .wix-forms-root label, .wix-forms-root p, .wix-forms-root div, .wix-forms-root select, .wix-forms-root li {
  font-family: wfont_70920c_83168c7e558a4ca0a1112348e51b02e0, wf_83168c7e558a4ca0a1112348e, orig_inter_regular;
}

.wix-forms-root .font-oswald {
  font-family: Oswald, oswald, oswald-medium, sans-serif;
}

.wix-forms-root .font-inter {
  font-family: wfont_70920c_83168c7e558a4ca0a1112348e51b02e0, wf_83168c7e558a4ca0a1112348e, orig_inter_regular;
}

.wix-forms-root p.break-words.font-inter {
    font-family: 'inter';
}
`;

const ensureGlobalStyles = () => {
  if (typeof document === "undefined") {
    return;
  }

  if (document.querySelector(WIX_FORMS_STYLE_SELECTOR)) {
    return;
  }

  const style = document.createElement("style");
  style.dataset.wixFormsCustomElements = "true";
  style.textContent = `${WIX_FORMS_RESET_STYLES}\n${wixFormsStyles}`;
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
      mountNode.className = "wix-forms-root";
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
