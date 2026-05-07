import type { UseMenuVisibilityReturn } from "../composables/useMenuVisibility";

export type SelectMenuKeydownHandlerParams = {
  event: KeyboardEvent;
  hideMenu: UseMenuVisibilityReturn["hideMenu"];
  showMenu: UseMenuVisibilityReturn["showMenu"];
};

export const selectMenuKeydownHandler = ({
  event,
  hideMenu,
  showMenu,
}: SelectMenuKeydownHandlerParams): void => {
  switch (event.code) {
    case "Escape": {
      hideMenu();
      break;
    }

    case "Enter": {
      showMenu();
      break;
    }
  }
};
