import { tv } from "tailwind-variants";
import type { TogglerState, TogglerThemeVariants, TogglerVariants } from "./types";

export const togglerStates: Record<TogglerState, string> = /*tw*/ {
  activeEnabled:
    "bg-blue-600 hover:bg-blue-700 cursor-pointer focus-visible:ring-2 focus-visible:ring-blue-600",
  inactiveEnabled:
    "bg-grey-400 hover:bg-grey-600 cursor-pointer focus-visible:ring-2 focus-visible:ring-blue-600",
  activeDisabled: "bg-blue-500 opacity-40",
  inactiveDisabled: "bg-grey-400 opacity-40",
};

export const togglerDefaultVariants: Partial<TogglerVariants> = { state: "inactiveEnabled" };

export const togglerVariants: TogglerThemeVariants = {
  state: togglerStates,
};

export const TOGGLER_TV_THEME = tv({
  base: "relative block h-6 w-[2.875rem] rounded-full duration-200 focus-visible:outline-none focus-visible:ring-offset-2",
  variants: togglerVariants,
  defaultVariants: togglerDefaultVariants,
  slots: {
    input: "h-0 w-0 opacity-0",
    span: "absolute bottom-1 left-1 h-4 w-4 rounded-full bg-white",
  },
});

export const togglerTheme = TOGGLER_TV_THEME;
