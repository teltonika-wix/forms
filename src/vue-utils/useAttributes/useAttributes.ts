import { type HTMLAttributes, useAttrs } from "vue";

export const useAttributes = (defaultAttributes: HTMLAttributes): HTMLAttributes => {
  const attrs = useAttrs();

  return { ...defaultAttributes, ...attrs };
};
