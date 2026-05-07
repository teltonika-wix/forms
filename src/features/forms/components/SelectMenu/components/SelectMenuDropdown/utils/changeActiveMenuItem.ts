import type { SelectMenuOption } from '../types';

export type ChangeActiveMenuItemParams = { menuItems: SelectMenuOption[]; selectedItem: SelectMenuOption };

export const changeActiveMenuItem = ({ menuItems, selectedItem }: ChangeActiveMenuItemParams): SelectMenuOption[] => {
  return menuItems.map((menuItem) => {
    if (menuItem.value === selectedItem.value) {
      return { ...menuItem, isActive: true };
    }

    return { ...menuItem, isActive: false };
  });
};
