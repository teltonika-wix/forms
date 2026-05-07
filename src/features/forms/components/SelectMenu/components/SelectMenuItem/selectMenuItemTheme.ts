import { type VariantProps, tv } from "tailwind-variants";

export const SELECT_MENU_ITEM_TV_THEME = {
  base: /*tw*/ `px-3 py-2 hover:bg-blue-100 dark:hover:bg-grey-700 cursor-pointer duration-200`,
  variants: {
    isSelected: {
      true: /*tw*/ `bg-blue-100 dark:bg-grey-700`,
    },
  },
} as const;

export const selectMenuItemTheme = tv(SELECT_MENU_ITEM_TV_THEME);

export type SelectMenuItemThemeProps = VariantProps<typeof selectMenuItemTheme>;
