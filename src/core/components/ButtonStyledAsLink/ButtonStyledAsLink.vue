<script lang="ts" setup>
import { buttonStyledAsLinkTheme } from './buttonStyledAsLinkTheme';
import { computed } from 'vue';

const classes = computed(() => {
  return buttonStyledAsLinkTheme();
});
</script>

<template>
  <button :class="classes" type="button">
    <slot />
  </button>
</template>
