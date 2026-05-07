<script setup lang="ts">
import { CheckIcon, ChevronDoubleRightIcon, ChevronRightIcon } from "@heroicons/vue/24/outline";
import { Text } from "../../../Text";
import type { TextListNestedProps, TextListTypeToListItemPrefixComponentMap } from "../../types";
import ListItemPrefixOrdered from "../ListItemPrefixOrdered/ListItemPrefixOrdered.vue";
import ListItemPrefixUnordered from "../ListItemPrefixUnordered/ListItemPrefixUnordered.vue";
import { useListNested } from "./composables/useListNested";
import { computed } from "vue";

const listTypeToListItemPrefixComponentMap: TextListTypeToListItemPrefixComponentMap = {
  ordered: ListItemPrefixOrdered,
  unordered: ListItemPrefixUnordered,
  "icon-checked": CheckIcon,
  "icon-arrow-double": ChevronDoubleRightIcon,
  "icon-arrow-single": ChevronRightIcon,
};

const { type = "unordered", items, punctuation, level } = defineProps<TextListNestedProps>();

const allProps = computed(() => {
  return { items, punctuation, level, type };
});

const {
  listTag,
  listItemPrefixElementClasses,
  listItemPrefixComponent,
  getListItemPunctuation,
  listItemPrefixIconTypes,
} = useListNested(allProps.value, listTypeToListItemPrefixComponentMap);
</script>

<template>
  <component :is="listTag">
    <li v-for="(item, index) in allProps.items" :key="item.id" class="flex">
      <div class="flex shrink-0 justify-end" :class="listItemPrefixElementClasses">
        <component
          :is="listItemPrefixComponent"
          :punctuation="getListItemPunctuation(index)"
          :class="{ 'size-6': listItemPrefixIconTypes.includes(allProps.type) }"
        />
      </div>

      <div>
        <Text
          :class="{
            'ml-2': allProps.level !== 1 || allProps.type !== 'unordered',
          }"
        >
          {{ item.text }}
        </Text>

        <ListNested
          v-if="item.items"
          :items="item.items"
          :type="allProps.type"
          :punctuation="getListItemPunctuation(index)"
          :level="allProps.level + 1"
        />
      </div>
    </li>
  </component>
</template>
