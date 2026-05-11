import { FormCodes } from "src/domains/forms/forms-kit";

const createdApps: Array<{
  component: ReturnType<typeof vi.fn>;
  mount: ReturnType<typeof vi.fn>;
  unmount: ReturnType<typeof vi.fn>;
}> = [];

const createAppMock = vi.fn((component, props) => {
  const app = {
    component: vi.fn().mockReturnThis(),
    mount: vi.fn(),
    unmount: vi.fn(),
  };

  createdApps.push(app);
  return app;
});

vi.mock("vue", () => ({
  createApp: createAppMock,
}));

vi.mock("src/domains/forms/form-ui-generator/components/BrowserFormGenerator", () => ({
  BrowserFormGenerator: { name: "BrowserFormGenerator" },
}));

vi.mock("src/domains/forms/form-ui-generator/components/Form", () => ({
  Form: { name: "Form" },
}));

vi.mock("src/components/Spinner", () => ({
  Spinner: { name: "Spinner" },
}));

vi.mock("src/form-build/wix-forms-style", () => ({
  wixFormsStyles: ".mock-style { color: red; }",
}));

const clearCookies = () => {
  document.cookie.split(";").forEach((cookie) => {
    const cookieName = cookie.split("=")[0]?.trim();
    if (cookieName) {
      document.cookie = `${cookieName}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
    }
  });
};

describe("wix-forms custom elements", () => {
  beforeAll(async () => {
    await import("../wix-forms");
  });

  beforeEach(() => {
    createAppMock.mockClear();
    createdApps.length = 0;
    document.body.innerHTML = "";
    document.head.innerHTML = "";
    clearCookies();
    window.history.pushState({}, "", "/");
    (globalThis as { wixEmbedsAPI?: { getLanguage?: () => string | undefined } }).wixEmbedsAPI =
      undefined;
  });

  it("registers contact form element and renders with defaults", () => {
    const element = document.createElement("contact-form");
    document.body.appendChild(element);

    expect(customElements.get("contact-form")).toBeDefined();
    expect(createAppMock).toHaveBeenCalledTimes(1);

    const props = createAppMock.mock.calls[0]?.[1] as Record<string, unknown>;
    expect(props.recaptchaSiteKey).toBe("6LeJngIoAAAAAKmat_gUGMapx1og_-Kr_bE379yx");
    expect(props.formWebClientEndpoint).toBe("/tlt-networks/_functions/form");
    expect(props.submitButtonText).toBe("Submit");
    expect(props.isDev).toBe(false);
    expect(props.prefills).toBeUndefined();
    expect(props.formUrlParameters).toEqual({
      language: "en",
      form: FormCodes.ContactForm,
    });
  });

  it("adds global styles only once for multiple elements", () => {
    document.body.appendChild(document.createElement("contact-form"));
    document.body.appendChild(document.createElement("newsletter-form"));

    expect(document.querySelectorAll("style[data-wix-forms-custom-elements]")).toHaveLength(1);
  });

  it("builds newsletter prefills from url and cookies", () => {
    window.history.pushState({}, "", "/?email=test%40example.com");
    document.cookie = "utm_source=google; path=/";
    document.cookie = "utm_campaign=spring-launch; path=/";

    const element = document.createElement("newsletter-form");
    document.body.appendChild(element);

    const props = createAppMock.mock.calls[0]?.[1] as Record<string, unknown>;
    expect(props.prefills).toEqual({
      email: "test@example.com",
      utm_source: "google",
      utm_campaign: "spring-launch",
    });
  });

  it("falls back newsletter email prefill to empty string", () => {
    window.history.pushState({}, "", "/?foo=bar");

    const element = document.createElement("newsletter-form");
    document.body.appendChild(element);

    const props = createAppMock.mock.calls[0]?.[1] as Record<string, unknown>;
    expect(props.prefills).toEqual({
      email: "",
    });
  });

  it("merges attribute-based prefills with computed prefills", () => {
    window.history.pushState({}, "", "/?email=url-email%40example.com");
    document.cookie = "utm_source=newsletter; path=/";

    const element = document.createElement("newsletter-form");
    element.setAttribute("prefills", JSON.stringify({ name: "Alice", email: "old@example.com" }));
    element.setAttribute("prefill-last-name", "Doe");
    document.body.appendChild(element);

    const props = createAppMock.mock.calls[0]?.[1] as Record<string, unknown>;
    expect(props.prefills).toEqual({
      name: "Alice",
      last_name: "Doe",
      email: "url-email@example.com",
      utm_source: "newsletter",
    });
  });

  it("uses explicit attributes and rerenders when observed attributes change", () => {
    const element = document.createElement("contact-form");
    element.setAttribute("recaptcha-site-key", "custom-key");
    element.setAttribute("form-web-client-endpoint", "/custom-endpoint");
    element.setAttribute("language", "lt");
    element.setAttribute("submit-button-text", "Send");
    element.setAttribute("is-dev", "true");
    element.setAttribute("form-code", FormCodes.RMSQuizForm);
    document.body.appendChild(element);

    let props = createAppMock.mock.calls[0]?.[1] as Record<string, unknown>;
    expect(props.recaptchaSiteKey).toBe("custom-key");
    expect(props.formWebClientEndpoint).toBe("/custom-endpoint");
    expect(props.submitButtonText).toBe("Send");
    expect(props.isDev).toBe(true);
    expect(props.formUrlParameters).toEqual({
      language: "lt",
      form: FormCodes.RMSQuizForm,
    });

    element.setAttribute("language", "de");

    expect(createAppMock).toHaveBeenCalledTimes(2);
    expect(createdApps[0]?.unmount).toHaveBeenCalledTimes(1);

    props = createAppMock.mock.calls[1]?.[1] as Record<string, unknown>;
    expect(props.formUrlParameters).toEqual({
      language: "de",
      form: FormCodes.RMSQuizForm,
    });
  });

  it("uses wix language fallback and normalizes uk to ua", () => {
    (globalThis as { wixEmbedsAPI?: { getLanguage?: () => string | undefined } }).wixEmbedsAPI = {
      getLanguage: () => "uk",
    };

    const element = document.createElement("contact-form");
    document.body.appendChild(element);

    const props = createAppMock.mock.calls[0]?.[1] as Record<string, unknown>;
    expect(props.formUrlParameters).toEqual({
      language: "ua",
      form: FormCodes.ContactForm,
    });
  });

  it("unmounts app when element is disconnected", () => {
    const element = document.createElement("contact-form");
    document.body.appendChild(element);

    document.body.removeChild(element);

    expect(createdApps[0]?.unmount).toHaveBeenCalledTimes(1);
  });
});
