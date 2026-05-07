<script lang="ts" setup>
import ListNested from './components/ListNested/ListNested.vue';
import type { TextListProps } from './types';
import { computed } from 'vue';

const { type = 'unordered', items } = defineProps<TextListProps>();

const allProps = computed(() => {
  return { type, items };
});
</script>

<template>
  <ListNested v-bind="allProps" :punctuation="[]" :level="1" />
</template>
