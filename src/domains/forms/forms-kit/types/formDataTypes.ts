import type {
  FormInputComponentNames,
  FormInputTypographyColor,
  FormInputTypographyTag,
  FormInputTypographyVariant,
  FormInputTypographyWeight,
} from "../formConstants";
import type { FormCodes } from "./formEnums";

export type FormRenderingDataProperties = {
  trackPixel: boolean;
  sendToHubSpot: boolean;
  sendToZoom: boolean;
  sendToMailerLite: boolean;
};

export type FormRenderingDataResponse = {
  code: FormCodes;
  successTitle: string;
  errorTitle: string;
  successMessage: string;
  errorMessage: string;
  properties: FormRenderingDataProperties;
  inputs: FormInputComponentData[];
};

export type FormInputComponentData = {
  component: FormInputComponentNames;
  defaultValue: string;
  imageLabel: string;
  priority: number;
  translations: {
    label: string;
    content?: string;
  };
  props?: FormInputComponentProps;
  attributes: {
    id: string;
    name: string;
    style?: string;

    inputmode:
      | "none"
      | "text"
      | "decimal"
      | "numeric"
      | "tel"
      | "search"
      | "email"
      | "url";

    // Textarea attrs
    max?: number;
    min?: number;
    rows?: number;
  };
  options: FormRenderingDataInputOption[];
};

export type FormInputSpacingValue = 0 | 8 | 16 | 24;
export type FormInputSpacingProperty = {
  top: FormInputSpacingValue;
  bottom: FormInputSpacingValue;
  left: FormInputSpacingValue;
  right: FormInputSpacingValue;
};

export type FormInputTypographyProperty = {
  variant: FormInputTypographyVariant;
  weight: FormInputTypographyWeight;
  tag: FormInputTypographyTag;
  color: FormInputTypographyColor;
};

export type FormInputRelationProperty = {
  relatedFieldName: string;
  stateBefore: "hidden" | "shown";
  stateAfter: "hidden" | "shown";
  onChange: string;
  hideOnEmptyRelation: boolean;
};

export type FormInputComponentProps = {
  spacing?: FormInputSpacingProperty;
  typography?: FormInputTypographyProperty;
  relation?: FormInputRelationProperty;
  hasCounter?: boolean;
  isSearchable?: boolean;
};

export type FormRenderingDataInputOption = {
  parentKey: null | string;
  key: string;
  content: string;
  category: string;
  imageContent: string;
  isDefault: boolean;
  priority: number;
};
