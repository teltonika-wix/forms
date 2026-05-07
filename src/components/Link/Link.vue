<script setup lang="ts">
import { useAttributes } from 'src/vue-utils';
import type { LinkData } from './types';
import { extractLinkAttrs } from './utils/extractLinkAttrs';
import { computed } from 'vue';

const { external, documentTarget, relationship, url = '/', ariaLabel } = defineProps<LinkData>();

const defaultAnchorAttrs = computed(() => {
  return extractLinkAttrs({ external, url, documentTarget, relationship, ariaLabel });
});
const attributes = computed(() => useAttributes(defaultAnchorAttrs.value));
</script>

<template>
  <a v-bind="attributes">
    <slot />
  </a>
</template>
