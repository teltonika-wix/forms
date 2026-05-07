import type {
  FormInputTypographyProperty,
  FormInputTypographyTag,
  FormInputTypographyVariant,
  FormInputTypographyWeight,
} from "src/domains/forms/forms-kit";
import { isKeyInObject } from "src/utilities";
import type { HeadingProps } from "src/legacy/core/components/Heading";

export type HeadingWeightMap = {
  [key in FormInputTypographyWeight]: HeadingProps["weight"];
};
export const headingWeightMap: HeadingWeightMap = {
  regular: "light",
  bold: "medium",
};

export type HeadingSizeMapKey = Extract<
  FormInputTypographyVariant,
  "h5" | "h4" | "h3" | "h2" | "h1"
>;
export type HeadingSizeMap = {
  [key in HeadingSizeMapKey]: HeadingProps["size"];
};
export const headingSizeMap: HeadingSizeMap = {
  h5: "xs",
  h4: "s",
  h3: "m",
  h2: "l",
  h1: "xl",
};

export type HeadingTagMapKey = FormInputTypographyTag;
export type HeadingTagMap = {
  [key in HeadingTagMapKey]: HeadingProps["tag"];
};
export const headingTagMap: HeadingTagMap = {
  p: "p",
  h5: "h5",
  h4: "h4",
  h3: "h3",
  h2: "h2",
  h1: "h1",
};

export const extractHeadingProps = (
  typography: FormInputTypographyProperty,
): HeadingProps | undefined => {
  if (!isKeyInObject(typography.variant, headingSizeMap)) {
    return;
  }

  const weight = headingWeightMap[typography.weight];
  const tag = headingTagMap[typography.tag];

  return {
    size: headingSizeMap[typography.variant],
    weight,
    tag,
  };
};
