<script lang="ts" setup>
import { Text } from "../../../Text";
import type { ListItemPrefixOrderedProps } from "./types";
import { computed } from "vue";

const props = defineProps<ListItemPrefixOrderedProps>();

const previewLevels = computed(() => {
  return `${props.punctuation.join(".")}.`;
});
</script>

<template>
  <Text>{{ previewLevels }}</Text>
</template>
