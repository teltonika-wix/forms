import type { FormRenderingDataInputOption } from "src/domains/forms/forms-kit";
import type { SelectMenuOption } from "src/features/forms/components/SelectMenu";

export type LocationSelectOption =
  SelectMenuOption<FormRenderingDataInputOption>;

export type MenuOptionsMapByParent = {
  independent: LocationSelectOption[];
  [key: string]: LocationSelectOption[] | undefined;
};

export type ExtractSelectMenuOptionsReturn = {
  menuOptions: MenuOptionsMapByParent;
  defaultOption?: LocationSelectOption;
};

export const extractSelectMenuOptions = ({
  options,
  defaultValue,
}: {
  options?: FormRenderingDataInputOption[];
  defaultValue: string;
}): ExtractSelectMenuOptionsReturn => {
  const optionsMapByParent: MenuOptionsMapByParent = { independent: [] };

  if (!options || !Array.isArray(options)) {
    return { menuOptions: optionsMapByParent };
  }

  let defaultOption;

  options.forEach((item) => {
    const optionItem: LocationSelectOption = {
      ...item,
      label: item.content,
      value: item.key,
      isActive: !!item.isDefault,
    };

    if (defaultValue && defaultValue === optionItem.key) {
      defaultOption = optionItem;
    }

    if (!item.parentKey) {
      optionsMapByParent.independent.push(optionItem);

      return;
    }

    if (!optionsMapByParent[item.parentKey]) {
      optionsMapByParent[item.parentKey] = [];
    }

    optionsMapByParent[item.parentKey]?.push(optionItem);
  });

  return { menuOptions: optionsMapByParent, defaultOption };
};
