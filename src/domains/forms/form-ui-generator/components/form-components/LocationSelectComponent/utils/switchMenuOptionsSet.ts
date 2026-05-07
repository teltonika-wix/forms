import { isString } from "src/utilities";
import type { FormInputsState } from "../../../../stores/FormStateFactory";
import type { LocationSelectOption, MenuOptionsMapByParent } from "./extractSelectMenuOptions";
import { type ComputedRef, computed } from "vue";

export type SwitchMenuOptionsSetParams = {
  menuOptions: MenuOptionsMapByParent;
  relatedFieldName?: string;
  formInputsState?: FormInputsState;
};

export const switchMenuOptionsSet = ({
  menuOptions,
  relatedFieldName,
  formInputsState,
}: SwitchMenuOptionsSetParams): LocationSelectOption[] | ComputedRef<LocationSelectOption[]> => {
  if (!relatedFieldName || !formInputsState) {
    return menuOptions.independent;
  }

  return computed(() => {
    const relatedFieldData = formInputsState[relatedFieldName];

    if (!relatedFieldData) {
      return menuOptions.independent;
    }

    if (!relatedFieldData || !isString(relatedFieldData.value)) {
      return menuOptions.independent;
    }

    const optionsSet = menuOptions[relatedFieldData.value];

    if (!optionsSet) {
      return [];
    }

    return optionsSet;
  });
};
