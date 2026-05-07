import type { SelectDropdownVisibilityChange } from '../types';
import { type Ref, ref } from 'vue';

export type UseMenuVisibilityReturn = {
  isMenuVisible: Ref<boolean>;
  hideMenu: () => void;
  showMenu: () => void;
  toggleMenuVisibility: () => void;
};
export type UseMenuVisibilityParams = { disabled?: boolean; onVisibilityChange: SelectDropdownVisibilityChange };

export const useMenuVisibility = ({
  disabled,
  onVisibilityChange,
}: UseMenuVisibilityParams): UseMenuVisibilityReturn => {
  const isMenuVisible = ref(false);

  const hideMenu = (): void => {
    isMenuVisible.value = false;
    onVisibilityChange(isMenuVisible.value);
  };

  const showMenu = (): void => {
    if (disabled) {
      return;
    }

    isMenuVisible.value = true;
    onVisibilityChange(isMenuVisible.value);
  };

  const toggleMenuVisibility = (): void => {
    if (isMenuVisible.value) {
      hideMenu();

      return;
    }

    showMenu();
  };

  return {
    isMenuVisible,
    hideMenu,
    showMenu,
    toggleMenuVisibility,
  };
};
