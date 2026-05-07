<script setup lang="ts">
import { ChevronUpIcon } from '@heroicons/vue/24/outline';
import { Field } from 'src/legacy/core/components/form/Field';
import { ErrorMessage, ErrorMessageIcon } from 'src/legacy/core/components/form/ErrorMessage';
import {
  type SelectDropdownVisibilityChange,
  SelectMenuDropdown,
  type SelectMenuItemChange,
  changeActiveMenuItem,
} from './components/SelectMenuDropdown';
import type { SelectMenuProps } from './types';
import { onMounted, ref, watch } from 'vue';

const props = defineProps<SelectMenuProps>();
const menuItemsRef = ref(props.selectMenuOptions);
const selectInputRef = ref<HTMLInputElement | null>(null);
const inputValue = ref(props.defaultValue?.value || '');
const isMenuActive = ref(false);
const emit = defineEmits<{
  onItemSelect: Parameters<SelectMenuItemChange>;
  onVisibilityChange: Parameters<SelectDropdownVisibilityChange>;
}>();

const onItemSelect: SelectMenuItemChange = (event, selectedItem) => {
  inputValue.value = selectedItem.value;
  menuItemsRef.value = changeActiveMenuItem({ menuItems: props.selectMenuOptions, selectedItem });
  emit('onItemSelect', event, selectedItem);
};

const onVisibilityChange: SelectDropdownVisibilityChange = (isVisible) => {
  isMenuActive.value = isVisible;

  if (isVisible) {
    selectInputRef.value?.focus();
  }

  emit('onVisibilityChange', isVisible);
};

onMounted(() => {
  const activeMenuOption = props.selectMenuOptions.find((option) => option.isActive);

  if (activeMenuOption?.value && !inputValue.value) {
    inputValue.value = activeMenuOption.value;
  }
});

watch(
  () => props.selectMenuOptions,
  () => {
    menuItemsRef.value = props.selectMenuOptions;

    const isInputValueExistsInNewMenuOptions = props.selectMenuOptions.some((option) => {
      return option.value === inputValue.value;
    });

    if (!isInputValueExistsInNewMenuOptions) {
      inputValue.value = props.defaultValue?.value || '';
    }
  },
);
</script>

<template>
  <div>
    <SelectMenuDropdown
      :selectMenuOptions="menuItemsRef"
      :disabled="disabled"
      :search="search"
      @onItemSelect="onItemSelect"
      @onVisibilityChange="onVisibilityChange"
    >
      <Field
        :error="error"
        :label="label"
        :valueLength="inputValue?.length"
        :disabled="disabled"
        :readonly="readonly"
        :labelFor="id"
        :comment="comment"
      >
        <input
          :id="id"
          ref="selectInputRef"
          :disabled="disabled"
          :value="inputValue"
          :name="name"
          :placeholder="placeholder"
          :readonly="!disabled"
          class="block w-full cursor-pointer appearance-none bg-transparent text-current outline-none"
          type="text"
        />
        <template #right>
          <div class="flex items-center">
            <ChevronUpIcon
              class="ml-2 mr-1 size-4 transition-all duration-200"
              :class="[
                { 'rotate-180': !isMenuActive, '': disabled },
                disabled ? 'text-grey-400 dark:text-grey-500' : 'text-grey-600 dark:text-grey-400',
              ]"
            />
          </div>
        </template>
      </Field>
    </SelectMenuDropdown>
    <div v-if="error" class="mt-1 grid grid-cols-[min-content_auto] gap-x-1">
      <ErrorMessageIcon class="mt-0.5" /><ErrorMessage>{{ error }}</ErrorMessage>
    </div>
  </div>
</template>
