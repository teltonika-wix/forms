import "public/sentry/customElementSentry.js";
import "src/form-build/wix-forms";

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

const formComponents = [
  "contact-form",
  "contact-form-modal",
  "newsletter-form",
  "rms-quiz",
] as const;

const url = new URL(window.location.href);
const formWebClientEndpoint =
  url.searchParams.get(MOCK_FORMS_QUERY_PARAM) === "1"
    ? FAKE_FORM_ENDPOINT
    : PRODUCTION_FORM_ENDPOINT;

const wixLanguage = window.wixEmbedsAPI?.getLanguage?.();
const language = wixLanguage === "uk" ? "ua" : (wixLanguage ?? "en");
const utmSource = getCookie("utm_source");
const utmCampaign = getCookie("utm_campaign");
const formElements = document.querySelectorAll<HTMLElement>(formComponents.join(","));

formElements.forEach((element) => {
  if (!element.hasAttribute("recaptcha-site-key")) {
    element.setAttribute("recaptcha-site-key", "6LeJngIoAAAAAKmat_gUGMapx1og_-Kr_bE379yx");
  }

  if (!element.hasAttribute("form-web-client-endpoint")) {
    element.setAttribute("form-web-client-endpoint", formWebClientEndpoint);
  }

  if (!element.hasAttribute("language")) {
    element.setAttribute("language", language);
  }

  const nextPrefills: Record<string, string> = {};

  if (element.localName === "newsletter-form") {
    const email = url.searchParams.get("email");
    if (email) {
      nextPrefills.email = email;
    }
  }

  if (utmSource) {
    nextPrefills.utm_source = utmSource;
  }

  if (utmCampaign) {
    nextPrefills.utm_campaign = utmCampaign;
  }

  if (Object.keys(nextPrefills).length > 0) {
    const existingPrefillsAttribute = element.getAttribute("prefills");
    let existingPrefills: Record<string, string> = {};

    if (existingPrefillsAttribute) {
      try {
        const parsed = JSON.parse(existingPrefillsAttribute) as unknown;
        if (parsed && typeof parsed === "object") {
          existingPrefills = parsed as Record<string, string>;
        }
      } catch {
        existingPrefills = {};
      }
    }

    element.setAttribute("prefills", JSON.stringify({ ...existingPrefills, ...nextPrefills }));
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
