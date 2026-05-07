import type { FormInputSpacingProperty } from "src/domains/forms/forms-kit";

const leftSpacings = {
  0: "",
  8: "ml-2",
  16: "ml-4",
  24: "ml-6",
  32: "ml-8",
};
const rightSpacings = {
  0: "",
  8: "mr-2",
  16: "mr-4",
  24: "mr-6",
  32: "mr-8",
};
const topSpacings = {
  0: "",
  8: "mt-2",
  16: "mt-4",
  24: "mt-6",
  32: "mt-8",
};
const bottomSpacings = {
  0: "",
  8: "mb-2",
  16: "mb-4",
  24: "mb-6",
  32: "mb-8",
};

export const mapToSpacingClasses = (spacing?: FormInputSpacingProperty): string => {
  if (!spacing) {
    return "my-2";
  }

  const { left, right, top, bottom } = spacing;
  const classes = [];

  if (leftSpacings[left]) {
    classes.push(leftSpacings[left]);
  }

  if (rightSpacings[right]) {
    classes.push(rightSpacings[right]);
  }

  if (topSpacings[top]) {
    classes.push(topSpacings[top]);
  }

  if (bottomSpacings[bottom]) {
    classes.push(bottomSpacings[bottom]);
  }

  return classes.join(" ");
};
