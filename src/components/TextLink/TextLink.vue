<script setup lang="ts">
import { Link } from '../Link';
import { textLinkTheme } from './textLinkTheme';
import type { TextLinkProps } from './types';
import { computed } from 'vue';

const {
  enableVisitedStyles = false,
  external,
  documentTarget,
  relationship,
  url = '/',
  ariaLabel,
} = defineProps<TextLinkProps>();

const classes = computed(() => {
  return textLinkTheme({
    visited: enableVisitedStyles ? 'enabled' : undefined,
  });
});
</script>

<template>
  <Link
    :class="classes"
    :url="url"
    :external="external"
    :documentTarget="documentTarget"
    :relationship="relationship"
    :ariaLabel="ariaLabel"
  >
    <slot />
  </Link>
</template>
