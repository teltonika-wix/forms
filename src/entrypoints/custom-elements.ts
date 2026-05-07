import "public/sentry/customElementSentry.js";
import { createFormWebElement, type FormTagName } from "src/form-build/wix-forms";
import { wixFormsStyles } from "src/form-build/wix-forms-style";

const PRODUCTION_FORM_ENDPOINT = "/tlt-networks/_functions/form";
const FAKE_FORM_ENDPOINT = "/_mock/forms";
const MOCK_FORMS_QUERY_PARAM = "mockForms";

declare global {
  interface Window {
    wixEmbedsAPI?: {
      getLanguage?: () => string | undefined;
    };
  }
}

const style = document.createElement("style");
style.textContent = wixFormsStyles;
document.body.appendChild(style);

const formComponents: FormTagName[] = [
  "contact-form",
  "contact-form-modal",
  "newsletter-form",
  "rms-quiz",
];

const url = new URL(window.location.href);
const formWebClientEndpoint =
  url.searchParams.get(MOCK_FORMS_QUERY_PARAM) === "1"
    ? FAKE_FORM_ENDPOINT
    : PRODUCTION_FORM_ENDPOINT;

formComponents.forEach((formTagName) => {
  const wixLanguage = window.wixEmbedsAPI?.getLanguage?.();
  const language = wixLanguage === "uk" ? "ua" : (wixLanguage ?? "en");

  const utmSource = getCookie("utm_source");
  const utmCampaign = getCookie("utm_campaign");
  const prefills: Record<string, string> = {};

  if (formTagName === "newsletter-form") {
    prefills.email = url.searchParams.get("email") ?? "";
  }

  if (utmSource) {
    prefills.utm_source = utmSource;
  }

  if (utmCampaign) {
    prefills.utm_campaign = utmCampaign;
  }

  if (!customElements.get(formTagName)) {
    customElements.define(
      formTagName,
      createFormWebElement({
        recaptchaSiteKey: "6LeJngIoAAAAAKmat_gUGMapx1og_-Kr_bE379yx",
        formWebClientEndpoint,
        language,
        prefills,
      }),
    );
  }
});

function getCookie(name: string): string | undefined {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);

  if (parts.length === 2) {
    return parts.pop()?.split(";").shift();
  }

  return undefined;
}
