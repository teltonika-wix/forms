export type BaseSelectMenuOption = { label: string; value: string; isActive?: boolean };
export type SelectMenuOption<T extends object = object> = T & BaseSelectMenuOption;

export type SelectMenuItemChange<T extends object = object> = (event: Event, selectedItem: SelectMenuOption<T>) => void;
export type SelectDropdownVisibilityChange = (isVisible: boolean) => void;

export type SelectMenuDropdownProps<T extends object = object> = {
  selectMenuOptions: SelectMenuOption<T>[];
  disabled?: boolean;
  search?: boolean;
};
