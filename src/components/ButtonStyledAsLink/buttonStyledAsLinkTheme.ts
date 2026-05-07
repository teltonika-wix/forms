import { tv } from "tailwind-variants";
import { textLinkTheme } from "../TextLink/textLinkTheme";

export const BUTTON_STYLED_AS_LINK_TV_THEME = {
  extend: textLinkTheme,
} as const;

export const buttonStyledAsLinkTheme = tv(BUTTON_STYLED_AS_LINK_TV_THEME);
