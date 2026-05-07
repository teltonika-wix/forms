import type {
  TextListNestedProps,
  TextListType,
  TextListTypeToListItemPrefixComponentMap,
} from "../../../types";
import { type Component, type ComputedRef, computed } from "vue";

type UseListNestedPropsParam = TextListNestedProps & { type: TextListType };
type GetListItemPunctuationReturn = number[];

type useListNestedReturn = {
  listItemPrefixElementClasses: ComputedRef<string>;
  listTag: ComputedRef<"ol" | "ul">;
  listItemPrefixComponent: ComputedRef<Component>;
  getListItemPunctuation: (listItemIndex: number) => GetListItemPunctuationReturn;
  listItemPrefixIconTypes: TextListType[];
};

export const useListNested = (
  props: UseListNestedPropsParam,
  listTypeToListItemPrefixComponentMap: TextListTypeToListItemPrefixComponentMap,
): useListNestedReturn => {
  const listTag = computed(() => {
    if (props.type === "ordered") {
      return "ol";
    }

    return "ul";
  });

  const listItemPrefixComponent = computed(() => {
    return listTypeToListItemPrefixComponentMap[props.type];
  });

  function getListItemPunctuation(listItemIndex: number): GetListItemPunctuationReturn {
    return [...props.punctuation, listItemIndex + 1];
  }

  const listItemPrefixElementClasses = computed(() => {
    if (props.level === 1) {
      return `w-6`;
    }

    if (props.level === 2) {
      return `w-10`;
    }

    return `w-16`;
  });

  const listItemPrefixIconTypes: TextListType[] = [
    "icon-arrow-single",
    "icon-arrow-double",
    "icon-checked",
  ];

  return {
    listTag,
    listItemPrefixComponent,
    getListItemPunctuation,
    listItemPrefixElementClasses,
    listItemPrefixIconTypes,
  };
};
