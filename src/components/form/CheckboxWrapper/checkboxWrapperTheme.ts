import { tv } from "tailwind-variants";

const CHECKBOX_WRAPPER_THEME = {
  slots: {
    root: "grid gap-x-2 gap-y-1 grid-cols-[1.5rem_auto]",
    checkbox: "row-start-1 row-end-2 my-1 justify-self-center",
    label: "row-start-1 row-end-2 self-center text-gray-500",
  },
};
export const checkboxWrapperTheme = tv(CHECKBOX_WRAPPER_THEME);
