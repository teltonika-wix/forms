import type {
  FormInputTypographyProperty,
  FormInputTypographyVariant,
  FormInputTypographyWeight,
} from "src/domains/forms/forms-kit";
import { isKeyInObject } from "src/utilities";
import type { TextProps } from "src/legacy/core/components/Text";

type TextWeightMap = {
  [key in FormInputTypographyWeight]: TextProps["weight"];
};
const textWeightMap: TextWeightMap = {
  regular: "normal",
  bold: "bold",
};

export type TextSizeMapKey = Extract<FormInputTypographyVariant, "l" | "m" | "s" | "xs">;
type TextSizeMap = {
  [key in TextSizeMapKey]: TextProps["size"];
};
const textSizeMap: TextSizeMap = {
  body_large: "l",
  body: "m",
  body_small: "s",
  body_micro: "xs",
};

export const extractTextProps = (
  typography: FormInputTypographyProperty,
): TextProps | undefined => {
  if (!isKeyInObject(typography.variant, textSizeMap)) {
    return;
  }

  const size = textSizeMap[typography.variant];
  const weight = textWeightMap[typography.weight];

  return {
    size,
    weight,
    tag: "p",
  };
};
