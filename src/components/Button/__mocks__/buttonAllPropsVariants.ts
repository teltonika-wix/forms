import { type ButtonColor, type ButtonSize, type ButtonWidth, buttonTheme } from "../buttonTheme";
import type { ButtonProps } from "../types";

const buttonColors = Object.keys(buttonTheme.variants.color) as ButtonColor[];
const buttonSizes = Object.keys(buttonTheme.variants.size) as ButtonSize[];
const buttonWidth = Object.keys(buttonTheme.variants.width) as ButtonWidth[];

const buttonAllPropsVariants: ButtonProps[] = [];
const buttonMainPropsVariants: Map<ButtonColor, Omit<ButtonProps, "width">[]> = new Map();

buttonColors.forEach((color) => {
  buttonSizes.forEach((size) => {
    const previousItem = buttonMainPropsVariants.get(color);

    if (previousItem) {
      previousItem.push({ color, size });
      buttonMainPropsVariants.set(color, previousItem);
    } else {
      buttonMainPropsVariants.set(color, [{ color, size }]);
    }

    buttonWidth.forEach((width) => {
      buttonAllPropsVariants.push({ color, size, width });
    });
  });
});

export const buttonVariantsMock = {
  buttonAllPropsVariants,
  buttonColors,
  buttonSizes,
  buttonWidth,
  buttonMainPropsVariants,
};
