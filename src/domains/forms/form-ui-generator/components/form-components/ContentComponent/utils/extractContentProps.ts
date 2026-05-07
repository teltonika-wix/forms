import type { FormInputComponentData } from "src/domains/forms/forms-kit";
import type { HeadingProps } from "src/legacy/core/components/Heading";
import type { TextProps } from "src/legacy/core/components/Text";
import { extractHeadingProps } from "./extractHeadingProps";
import { extractTextProps } from "./extractTextProps";

const defaultContentProps: { textProps: TextProps } = {
  textProps: {
    size: "m",
    weight: "normal",
    tag: "p",
  },
};

type ExtractContentPropsReturn = {
  textProps?: TextProps;
  headingProps?: HeadingProps;
  textValue?: string;
};

export const extractContentProps = (
  formInputData?: FormInputComponentData,
): ExtractContentPropsReturn => {
  if (!formInputData) {
    return {};
  }

  const { translations } = formInputData;

  if (!translations || !translations?.label) {
    return {};
  }

  const { typography } = formInputData.props || {};

  if (!typography) {
    return { ...defaultContentProps, textValue: translations.label };
  }

  const textProps = extractTextProps(typography);

  if (textProps) {
    return {
      textProps,
      textValue: translations.label,
    };
  }

  const headingProps = extractHeadingProps(typography);

  if (headingProps) {
    return {
      headingProps,
      textValue: translations.label,
    };
  }

  return { ...defaultContentProps, textValue: translations.label };
};
