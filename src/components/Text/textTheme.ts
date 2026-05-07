import { tv } from "tailwind-variants";

export const TEXT_TV_THEME = /*tw*/ {
  base: "font-inter break-words",
  variants: {
    size: {
      "2xl": "text-body-xl md:text-body-2xl",
      xl: "text-body-l md:text-body-xl",
      l: "text-body-m md:text-body-l",
      m: "text-body-m",
      s: "text-body-s",
      xs: "text-body-xs",
      spaced: "text-spaced-s md:text-spaced-m uppercase",
    },
    weight: {
      normal: "font-normal",
      bold: "font-bold",
    },
  },
  defaultVariants: {
    size: "m",
    weight: "normal",
  },
} as const;

export const textTheme = tv(TEXT_TV_THEME);
