<script setup lang="ts">
import { onClickOutside } from "@vueuse/core";
import { InputField } from "../../../InputField";
import { SelectMenuItem } from "../SelectMenuItem";
import { useMenuFloating } from "./composables/useMenuFloating";
import { useMenuVisibility } from "./composables/useMenuVisibility";
import type {
  BaseSelectMenuOption,
  SelectDropdownVisibilityChange,
  SelectMenuDropdownProps,
  SelectMenuItemChange,
  SelectMenuOption,
} from "./types";
import { selectMenuKeydownHandler } from "./utils/selectMenuKeydownHandler";
import { computed, isProxy, ref, toRaw } from "vue";

const searchText = ref<string>("");
const { selectMenuOptions, disabled, search = false } = defineProps<SelectMenuDropdownProps>();
const emit = defineEmits<{
  onItemSelect: Parameters<SelectMenuItemChange>;
  onVisibilityChange: Parameters<SelectDropdownVisibilityChange>;
}>();
const { isMenuVisible, hideMenu, showMenu, toggleMenuVisibility } = useMenuVisibility({
  disabled,
  onVisibilityChange: (isVisible) => {
    emit("onVisibilityChange", isVisible);
  },
});
const { menuOpenerRef, menuContainerRef, floatingStyles } = useMenuFloating();

onClickOutside(menuContainerRef, hideMenu, { ignore: [menuOpenerRef] });

const onItemClick: SelectMenuItemChange = (event, menuItem) => {
  const menuItemData = isProxy(menuItem) ? toRaw(menuItem) : menuItem;
  emit("onItemSelect", event, menuItemData);
  hideMenu();
};

const keydownHandler = (event: KeyboardEvent) => {
  selectMenuKeydownHandler({ event, hideMenu, showMenu });
};

const openerClickHandler = (event: MouseEvent) => {
  event.preventDefault();
  toggleMenuVisibility();
};

const options = computed<SelectMenuOption<BaseSelectMenuOption>[]>(() => {
  if (!search && searchText.value === "") selectMenuOptions;

  return selectMenuOptions.filter((option) =>
    option.label?.toLocaleLowerCase().includes(searchText.value.toLocaleLowerCase()),
  );
});
</script>

<template>
  <div
    ref="menuOpenerRef"
    class="w-full cursor-pointer"
    @click="openerClickHandler"
    @keydown="keydownHandler"
  >
    <slot />
  </div>
  <Transition>
    <div
      v-if="isMenuVisible"
      ref="menuContainerRef"
      :style="floatingStyles"
      class="shadow-shadow-1 dark:bg-grey-800 z-10 max-h-[16.75rem] overflow-hidden rounded bg-white py-1 dark:text-white"
    >
      <div v-if="search" class="px-2 py-2">
        <InputField
          id="select-search"
          name="select-search"
          class="search-container"
          :inputValue="searchText"
          @onValueUpdate="(e, value) => (searchText = value)"
        />
      </div>
      <ul class="max-h-[16.75rem] list-none overflow-y-auto py-1">
        <TransitionGroup
          name="dropdown"
          tag="div"
          class="select-menu-dropdown flex flex-col space-y-1"
        >
          <SelectMenuItem
            v-for="selectMenuOption in options"
            :key="selectMenuOption.value"
            :isSelected="!!selectMenuOption.isActive"
            tabindex="0"
            @click="(event) => onItemClick(event, selectMenuOption)"
            @keypress.enter="(event) => onItemClick(event, selectMenuOption)"
            @keypress.space="(event) => onItemClick(event, selectMenuOption)"
          >
            {{ selectMenuOption.label }}
          </SelectMenuItem>
        </TransitionGroup>
      </ul>
    </div>
  </Transition>
</template>

<style scoped>
@reference "tailwindcss";

.v-enter-active,
.v-leave-active {
  transition: max-height 0.2s ease-out;
}

.v-enter-from,
.v-leave-to {
  max-height: 0;
}

.dropdown-enter-active,
.dropdown-leave-active {
  @apply transition-all duration-200;
  transition-delay: 150ms;
  transition-timing-function: cubic-bezier(1, 1, 0.77, 1);
}

.dropdown-enter-from {
  @apply -translate-y-2 opacity-0;
}

.dropdown-enter-to {
  @apply translate-y-0 opacity-100;
}

.dropdown-leave-from {
  @apply translate-y-0 opacity-100;
}

.dropdown-leave-to {
  @apply -translate-y-2 opacity-0;
}
</style>
<style>
@reference "tailwindcss";

.search-container > div {
  @apply py-3;
}
</style>
