import { Comment, Fragment, type Slot, Text, type VNode } from "vue";

// Adapted from https://github.com/vuejs/vue-next/blob/ca17162e377e0a0bf3fae9d92d0fdcb32084a9fe/packages/runtime-core/src/helpers/renderSlot.ts#L77
const isVNodeEmpty = (vnodes: VNode[]): boolean => {
  return vnodes.every((node: VNode) => {
    if (node.type === Comment) {
      return true;
    }

    if (node.type === Text && typeof node.children === "string" && !node.children.trim()) {
      return true;
    }

    if (node.type === Fragment && isVNodeEmpty(node.children as VNode[])) {
      return true;
    }

    return false;
  });
};

export const isSlotEmpty = (slot: Slot | undefined): boolean => {
  if (!slot) {
    return true;
  }

  return isVNodeEmpty(slot());
};
