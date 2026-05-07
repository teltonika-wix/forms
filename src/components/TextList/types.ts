import type { Component } from "vue";

export type TextListType =
  | "ordered"
  | "unordered"
  | "icon-arrow-double"
  | "icon-arrow-single"
  | "icon-checked";

export type TextListTypeToListItemPrefixComponentMap = {
  [Key in TextListType]: Component;
};

export type TextListItem = {
  id: string | number;
  text: string;
  items?: TextListItem[];
};

export type TextListProps = {
  items: TextListItem[];
  type?: TextListType;
};

export type TextListNestedProps = TextListProps & {
  punctuation: number[];
  level: number;
};
