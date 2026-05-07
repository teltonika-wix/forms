import { type UseFloatingReturn, size, useFloating } from "@floating-ui/vue";
import { type Ref, ref } from "vue";

export type UseMenuFloatingReturn = {
  menuOpenerRef: Ref<HTMLButtonElement | null>;
  menuContainerRef: Ref<HTMLDivElement | null>;
  floatingStyles: UseFloatingReturn["floatingStyles"];
};

export const useMenuFloating = (): UseMenuFloatingReturn => {
  const menuOpenerRef = ref<HTMLButtonElement | null>(null);
  const menuContainerRef = ref<HTMLDivElement | null>(null);

  const { floatingStyles } = useFloating(menuOpenerRef, menuContainerRef, {
    middleware: [
      // Set menu container width by parent width
      size({
        apply({ rects, elements }) {
          Object.assign(elements.floating.style, {
            width: `${rects.reference.width}px`,
          });
        },
      }),
    ],
  });

  return {
    menuOpenerRef,
    menuContainerRef,
    floatingStyles,
  };
};
