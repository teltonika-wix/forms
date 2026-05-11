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
const FORM_TAG_NAMES = Object.keys(FORM_CODE_BY_TAG) as FormTagName[];
const DEFAULT_LANGUAGE = "en";
const DEFAULT_SUBMIT_BUTTON_TEXT = "Submit";
const DEFAULT_FORM_WEB_CLIENT_ENDPOINT = "/tlt-networks/_functions/form";
const WIX_FORM_WEB_CLIENT_ENDPOINT =
  "https://mantaspavalkis-website-1.editor.wix.com/_api/wix-code-http-functions-dev/_functions-test/form";
const DEFAULT_RECAPTCHA_SITE_KEY = "6LeJngIoAAAAAKmat_gUGMapx1og_-Kr_bE379yx";

const WIX_FORMS_STYLE_SELECTOR = "style[data-wix-forms-custom-elements]";
const WIX_FORMS_TAG_SELECTORS = FORM_TAG_NAMES.join(", ");
const WIX_FORMS_ROOT_SELECTORS = FORM_TAG_NAMES.map((tagName) => `${tagName} .wix-forms-root`).join(
  ", ",
);
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
  font-family: "inter", wfont_70920c_83168c7e558a4ca0a1112348e51b02e0, wf_83168c7e558a4ca0a1112348e, orig_inter_regular;
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

const BOOLEAN_TRUE_VALUES = new Set(["", "true", "1", "yes", "on"]);
const FORM_CODES = new Set<FormCodes>(Object.values(FormCodes));

const toPrefillKey = (key: string) => key.replaceAll("-", "_");

const toBoolean = (value: string | null): boolean | undefined => {
  if (value === null) {
    return undefined;
  }

  return BOOLEAN_TRUE_VALUES.has(value.toLowerCase());
};

const getAttributeValue = (element: HTMLElement, names: string[]): string | null => {
  for (const name of names) {
    const value = element.getAttribute(name);
    if (value !== null) {
      return value;
    }
  }

  return null;
};

const getCookie = (name: string): string | undefined => {
  if (typeof document === "undefined") {
    return undefined;
  }

  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);

  if (parts.length === 2) {
    return parts.pop()?.split(";").shift();
  }

  return undefined;
};

const resolveLanguage = (element: HTMLElement): string => {
  const explicitLanguage = getAttributeValue(element, ["language"])?.trim();
  if (explicitLanguage) {
    return explicitLanguage;
  }

  const wixLanguage = (
    globalThis as { wixEmbedsAPI?: { getLanguage?: () => string | undefined } }
  ).wixEmbedsAPI?.getLanguage?.();

  if (wixLanguage === "uk") {
    return "ua";
  }

  return wixLanguage ?? DEFAULT_LANGUAGE;
};

const resolveFormWebClientEndpoint = (element: HTMLElement): string => {
  const explicitEndpoint = getAttributeValue(element, [
    "form-web-client-endpoint",
    "formwebclientendpoint",
    "formWebClientEndpoint",
  ]);

  if (explicitEndpoint) {
    return explicitEndpoint;
  }

  const host = globalThis.location?.host;
  if (typeof host === "string" && host.includes("wix.com")) {
    return WIX_FORM_WEB_CLIENT_ENDPOINT;
  }

  return DEFAULT_FORM_WEB_CLIENT_ENDPOINT;
};

const parsePrefills = (element: HTMLElement): Record<string, string> | undefined => {
  const prefills: Record<string, string> = {};
  const formTagName = element.localName;
  const url =
    typeof globalThis.location?.href === "string" ? new URL(globalThis.location.href) : null;
  const utm_source = getCookie("utm_source");
  const utm_campaign = getCookie("utm_campaign");

  const prefillsAttribute = getAttributeValue(element, ["prefills"]);
  if (prefillsAttribute) {
    try {
      const parsedPrefills = JSON.parse(prefillsAttribute) as unknown;
      if (parsedPrefills && typeof parsedPrefills === "object") {
        for (const [key, value] of Object.entries(parsedPrefills as Record<string, unknown>)) {
          prefills[key] = String(value ?? "");
        }
      }
    } catch {
      // Ignore invalid JSON and continue with prefills from attributes.
    }
  }

  for (const attr of Array.from(element.attributes)) {
    if (attr.name.startsWith("prefill-")) {
      prefills[toPrefillKey(attr.name.slice("prefill-".length))] = attr.value;
    }
  }

  if (formTagName === "newsletter-form") {
    prefills.email = url?.searchParams.get("email") ?? "";
  }

  if (utm_source) {
    prefills.utm_source = utm_source;
  }

  if (utm_campaign) {
    prefills.utm_campaign = utm_campaign;
  }

  return Object.keys(prefills).length > 0 ? prefills : undefined;
};

class WixFormElement extends HTMLElement {
  static observedAttributes = [
    "recaptcha-site-key",
    "recaptchasitekey",
    "form-web-client-endpoint",
    "formwebclientendpoint",
    "language",
    "submit-button-text",
    "submitbuttontext",
    "is-dev",
    "isdev",
    "form-code",
    "formcode",
    "prefills",
  ];

  private app: App<Element> | null = null;
  private mountNode: HTMLElement | null = null;

  connectedCallback() {
    ensureGlobalStyles();
    this.renderApp();
  }

  attributeChangedCallback(name: string) {
    if (!this.isConnected) {
      return;
    }

    if (WixFormElement.observedAttributes.includes(name)) {
      this.renderApp();
    }
  }

  disconnectedCallback() {
    this.destroyApp();
    this.innerHTML = "";
    this.mountNode = null;
  }

  private destroyApp() {
    this.app?.unmount();
    this.app = null;
  }

  private renderApp() {
    this.destroyApp();

    if (!this.mountNode) {
      this.mountNode = document.createElement("div");
      this.mountNode.className = "wix-forms-root";
      this.appendChild(this.mountNode);
    }

    const recaptchaSiteKey =
      getAttributeValue(this, ["recaptcha-site-key", "recaptchasitekey", "recaptchaSiteKey"]) ??
      DEFAULT_RECAPTCHA_SITE_KEY;
    const formWebClientEndpoint = resolveFormWebClientEndpoint(this);
    const language = resolveLanguage(this);
    const submitButtonText =
      getAttributeValue(this, ["submit-button-text", "submitbuttontext", "submitButtonText"]) ??
      DEFAULT_SUBMIT_BUTTON_TEXT;

    const formCodeValue = getAttributeValue(this, ["form-code", "formcode", "formCode"]);
    const explicitFormCode =
      formCodeValue && FORM_CODES.has(formCodeValue as FormCodes)
        ? (formCodeValue as FormCodes)
        : undefined;
    const formCode = resolveFormCode(this.localName, explicitFormCode);
    const isDev = toBoolean(getAttributeValue(this, ["is-dev", "isdev", "isDev"])) ?? false;
    const prefills = parsePrefills(this);

    const app = createApp(BrowserFormGenerator, {
      recaptchaSiteKey,
      submitButtonText,
      formWebClientEndpoint,
      prefills,
      isDev,
      formUrlParameters: {
        language,
        form: formCode,
      },
    });

    app.component("Form", Form);
    app.component("Spinner", Spinner);
    app.mount(this.mountNode);

    this.app = app;
  }
}

const registerWixFormElements = () => {
  if (typeof customElements === "undefined" || typeof customElements.define !== "function") {
    return;
  }

  for (const tagName of FORM_TAG_NAMES) {
    if (!customElements.get(tagName)) {
      try {
        class WixFormElementForTag extends WixFormElement {}
        customElements.define(tagName, WixFormElementForTag);
      } catch (error) {
        if (error instanceof DOMException && error.name === "NotSupportedError") {
          continue;
        }

        throw error;
      }
    }
  }
};

registerWixFormElements();
