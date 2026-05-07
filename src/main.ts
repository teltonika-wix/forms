import "./assets/tailwind.css";
import "src/legacy/core/assets/fonts.css";
import "./style.css";
import { createApp, defineComponent, h } from "vue";
import { Form } from "src/domains/forms/form-ui-generator/components/Form";
import type { FormRenderingDataResponse, FormUrlParameters } from "src/domains/forms/forms-kit";

const formStructure = {
  code: "ContactForm",
  successTitle: "Thank You!",
  errorTitle: "ERROR OCCURRED",
  successMessage: "Hooray! Your request was successfully submitted!",
  errorMessage: "Failed to submit form. Please try again later!",
  properties: {
    trackPixel: true,
    sendToHubSpot: true,
    sendToZoom: false,
    sendToMailerLite: false,
  },
  inputs: [
    {
      component: "ContentComponent",
      defaultValue: "",
      priority: 1,
      translations: { label: "Contact us" },
      props: {
        spacing: { top: 8, bottom: 8, left: 0, right: 0 },
        typography: { variant: "h3", weight: "bold", tag: "p", color: "grey-800" },
      },
      attributes: { id: "9ac8be88-3660-4ff7-8435-deacfd4cb0b0", name: "content_h2_component" },
      options: [],
    },
    {
      component: "ContentComponent",
      defaultValue: "",
      priority: 2,
      translations: { label: "Please fill in all fields." },
      props: { spacing: { top: 8, bottom: 24, left: 0, right: 0 } },
      attributes: { id: "9ac8be88-40e1-4e19-9b92-aa2aaed75920", name: "content_p_component" },
      options: [],
    },
    {
      component: "LocationSelectComponent",
      defaultValue: "Lithuania",
      priority: 3,
      translations: { label: "Country" },
      props: { spacing: { top: 8, bottom: 8, left: 0, right: 0 } },
      attributes: { id: "9ac8be88-4cdf-4e82-b105-476fecba7e13", name: "location" },
      options: [
        { parentKey: null, key: "Lithuania", content: "Lithuania" },
        { parentKey: null, key: "United States of America", content: "United States of America" },
        { parentKey: null, key: "Canada", content: "Canada" },
        { parentKey: null, key: "Mexico", content: "Mexico" },
        { parentKey: null, key: "Australia", content: "Australia" },
        { parentKey: null, key: "India", content: "India" },
        { parentKey: null, key: "Germany", content: "Germany" },
      ],
    },
    {
      component: "LocationSelectComponent",
      defaultValue: "",
      priority: 4,
      translations: { label: "Region/State" },
      props: {
        spacing: { top: 8, bottom: 8, left: 0, right: 0 },
        relation: {
          relatedFieldName: "location",
          stateBefore: "hidden",
          stateAfter: "shown",
          onChange: "",
          hideOnEmptyRelation: true,
        },
      },
      attributes: { name: "state", id: "9be1c97b-c20b-4816-af4d-157e5c3dace0" },
      options: [
        { parentKey: "United States of America", key: "California", content: "California" },
        { parentKey: "United States of America", key: "Texas", content: "Texas" },
        { parentKey: "United States of America", key: "Florida", content: "Florida" },
        { parentKey: "Canada", key: "Ontario", content: "Ontario" },
        { parentKey: "Canada", key: "Quebec", content: "Quebec" },
        { parentKey: "Mexico", key: "Ciudad de México", content: "Ciudad de México" },
        { parentKey: "Mexico", key: "Jalisco", content: "Jalisco" },
        { parentKey: "Australia", key: "Victoria", content: "Victoria" },
        { parentKey: "Australia", key: "Queensland", content: "Queensland" },
        { parentKey: "India", key: "Maharashtra", content: "Maharashtra" },
        { parentKey: "India", key: "Tamil Nadu", content: "Tamil Nadu" },
      ],
    },
    {
      component: "SelectInput",
      defaultValue: "",
      priority: 5,
      translations: { label: "Topic" },
      props: { spacing: { top: 8, bottom: 8, left: 0, right: 0 } },
      attributes: { id: "9f088843-272f-4e53-bc0b-e6373fa67e07", name: "topic" },
      options: [
        { parentKey: null, key: "Corporate affairs", content: "Corporate affairs" },
        { parentKey: null, key: "Media inquiries", content: "Media inquiries" },
        { parentKey: null, key: "Networking products", content: "Networking products" },
        { parentKey: null, key: "Telematics products", content: "Telematics products" },
        { parentKey: null, key: "EV charging products", content: "EV charging products" },
      ],
    },
    {
      component: "GclidComponent",
      defaultValue: "",
      priority: 6,
      translations: {},
      props: {},
      attributes: { id: "9ac8be8c-4c73-48eb-bfe6-9f749a31104d", name: "gclid_field" },
      options: [],
    },
    {
      component: "SourceComponent",
      defaultValue: "",
      priority: 7,
      translations: { label: "Page source" },
      props: {},
      attributes: { id: "9ae11234-a680-4384-93bd-b92fe27afec6", name: "page_source" },
      options: [],
    },
    {
      component: "HiddenComponent",
      defaultValue: "Teltonika IoT group, Vilnius",
      priority: 8,
      translations: { label: "Company Division" },
      props: { spacing: { top: 8, bottom: 8, left: 0, right: 0 } },
      attributes: { id: "9ac8be8c-58f5-4667-92b3-8d51ef38fb86", name: "company_division" },
      options: [],
    },
    {
      component: "TextComponent",
      defaultValue: "",
      priority: 9,
      translations: { label: "Company Name" },
      props: { spacing: { top: 8, bottom: 8, left: 0, right: 0 } },
      attributes: { id: "9ac8be8c-63f8-4cc5-8958-8f78c75d6d72", name: "company_name" },
      options: [],
    },
    {
      component: "TextComponent",
      defaultValue: "",
      priority: 10,
      translations: { label: "Email" },
      props: { spacing: { top: 8, bottom: 8, left: 0, right: 0 } },
      attributes: {
        inputmode: "email",
        id: "9ac8be8c-6d59-46e3-a18e-38eddfb40c25",
        name: "email",
      },
      options: [],
    },
    {
      component: "TextComponent",
      defaultValue: "",
      priority: 11,
      translations: { label: "Telephone" },
      props: { spacing: { top: 8, bottom: 8, left: 0, right: 0 } },
      attributes: {
        inputmode: "tel",
        id: "9ac8be8c-7946-4b38-a082-0f425b35eab5",
        name: "phone",
      },
      options: [],
    },
    {
      component: "TextareaComponent",
      defaultValue: "",
      priority: 12,
      translations: { label: "Your Message" },
      props: {
        spacing: { top: 8, bottom: 8, left: 0, right: 0 },
        hasCounter: true,
      },
      attributes: {
        max: 3000,
        min: 20,
        rows: 4,
        id: "9ac8be8c-87ab-43e0-a7e8-78a198a29ad5",
        name: "message",
      },
      options: [],
    },
    {
      component: "CheckboxComponent",
      defaultValue: "",
      priority: 13,
      translations: {
        label:
          'I agree to share my personal data in accordance with the <a href="https://teltonika-iot-group.com/policies-certificates/privacy-policy" target="_blank">privacy policy</a>.',
      },
      props: { spacing: { top: 24, bottom: 8, left: 0, right: 0 } },
      attributes: {
        id: "9ac8be8c-96e0-41d3-af9b-16705761fbbc",
        name: "agree_with_privacy_policy",
      },
      options: [],
    },
    {
      component: "HiddenComponent",
      defaultValue: "212.59.13.227",
      priority: 35,
      translations: { label: "User IP" },
      props: {},
      attributes: { id: "clientIP", name: "client_ip" },
      options: [],
    },
  ],
} as const;

const rootElement = document.querySelector<HTMLElement>("#app");
if (!rootElement) {
  throw new Error("App root element was not found");
}

const formUrlParameters: FormUrlParameters = {
  language: "en",
  form: "ContactForm",
};

const App = defineComponent({
  render() {
    return h("main", { class: "page" }, [
      h("section", { class: "card" }, [
        h("header", { class: "card-header" }, [
          h("h1", "Generated Form Preview"),
          h("p", ["Form code: ", h("code", formStructure.code)]),
        ]),
        h(Form, {
          recaptchaSiteKey: "dev-recaptcha-key",
          formUrlParameters,
          clientFullUrl: window.location.href,
          formRenderingData: formStructure as unknown as FormRenderingDataResponse,
          submitButtonText: "Submit",
          formWebClientEndpoint: "/api/form",
          isDev: true,
        }),
      ]),
    ]);
  },
});

createApp(App).mount(rootElement);
