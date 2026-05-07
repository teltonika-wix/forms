export const FORM_INPUT_COMPONENT_NAMES = [
  "ContentComponent",
  "LocationSelectComponent",
  "SelectInput",
  "GclidComponent",
  "SourceComponent",
  "HiddenComponent",
  "TextComponent",
  "TextareaComponent",
  "CheckboxComponent",
  "CheckboxesComponent",
  "GroupErrorComponent",
  "FeedbackComponent",
] as const;

export const FORM_INPUT_TYPOGRAPHY_VARIANT = [
  "body_large",
  "body",
  "body_small",
  "body_micro",
  "h5",
  "h4",
  "h3",
  "h2",
  "h1",
] as const;

export const FORM_INPUT_TYPOGRAPHY_TAG = ["p", "h5", "h4", "h3", "h2", "h1"] as const;

export const FORM_INPUT_TYPOGRAPHY_COLOR = ["blue-900", "blue-800", "grey-600"] as const;

export const FORM_INPUT_TYPOGRAPHY_WEIGHT = ["bold", "regular"] as const;
export const FORM_URL_PARAMETERS = ["language", "form"] as const;

export type FormInputTypographyWeight = (typeof FORM_INPUT_TYPOGRAPHY_WEIGHT)[number];
export type FormInputTypographyVariant = (typeof FORM_INPUT_TYPOGRAPHY_VARIANT)[number];
export type FormInputTypographyTag = (typeof FORM_INPUT_TYPOGRAPHY_TAG)[number];
export type FormInputTypographyColor = (typeof FORM_INPUT_TYPOGRAPHY_COLOR)[number];
export type FormInputComponentNames = (typeof FORM_INPUT_COMPONENT_NAMES)[number];
export type FormUrlParameterKey = (typeof FORM_URL_PARAMETERS)[number];
