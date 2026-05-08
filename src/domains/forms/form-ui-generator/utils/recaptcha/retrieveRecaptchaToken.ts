import { isString } from "src/utilities";

const RECAPTCHA_SCRIPT_MARKER = "script[data-wix-forms-recaptcha]";

let recaptchaLoaderPromise: Promise<void> | null = null;

const getRecaptchaUrl = (siteKey: string): string =>
  `https://www.google.com/recaptcha/api.js?render=${encodeURIComponent(siteKey)}`;

const waitUntilReady = (): Promise<void> =>
  new Promise((resolve, reject) => {
    if (!window.grecaptcha) {
      reject(new Error("reCAPTCHA global is unavailable after script load"));
      return;
    }

    window.grecaptcha.ready(() => resolve());
  });

const loadRecaptchaScript = async (siteKey: string): Promise<void> => {
  if (typeof window === "undefined" || typeof document === "undefined") {
    throw new Error("Browser environment is required for reCAPTCHA");
  }

  if (window.grecaptcha) {
    await waitUntilReady();
    return;
  }

  if (!recaptchaLoaderPromise) {
    recaptchaLoaderPromise = new Promise<void>((resolve, reject) => {
      const existingScript = document.querySelector(
        RECAPTCHA_SCRIPT_MARKER,
      ) as HTMLScriptElement | null;
      const recaptchaScript =
        existingScript ??
        (() => {
          const script = document.createElement("script");
          script.src = getRecaptchaUrl(siteKey);
          script.async = true;
          script.defer = true;
          script.dataset.wixFormsRecaptcha = "true";
          document.head.appendChild(script);
          return script;
        })();

      const onScriptReady = () => {
        waitUntilReady().then(resolve).catch(reject);
      };

      const onScriptError = () => {
        reject(new Error("Failed to load reCAPTCHA script"));
      };

      if (window.grecaptcha) {
        onScriptReady();
        return;
      }

      recaptchaScript.addEventListener("load", onScriptReady, { once: true });
      recaptchaScript.addEventListener("error", onScriptError, { once: true });
    }).catch((error) => {
      recaptchaLoaderPromise = null;
      throw error;
    });
  }

  await recaptchaLoaderPromise;
};

export const retrieveRecaptchaToken = async (siteKey: string): Promise<string | null> => {
  try {
    await loadRecaptchaScript(siteKey);

    if (!window.grecaptcha) {
      return null;
    }

    const recaptchaToken = await window.grecaptcha.execute(siteKey, { action: "submit" });

    if (!isString(recaptchaToken)) {
      return null;
    }

    return recaptchaToken;
  } catch (error) {
    return null;
  }
};
