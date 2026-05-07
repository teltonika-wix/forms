import type { FormInputTypographyColor } from "src/domains/forms/forms-kit";

const colors = {
  "blue-800": "text-blue-800",
  "blue-900": "text-blue-900",
  "grey-600": "text-grey-600",
};

export const mapToColorClasses = (color?: FormInputTypographyColor): string => {
  if (!color) {
    return "";
  }

  return colors[color];
};
