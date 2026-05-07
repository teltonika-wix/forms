<script setup lang="ts">
import { togglerTheme } from './togglerTheme';
import type { TogglerProps } from './types';
import { getThemeState } from './utils/getThemeState';
import { computed } from 'vue';

const isActive = defineModel<boolean>('isActive', { default: false });
const props = defineProps<TogglerProps>();

const state = computed(() => getThemeState(isActive.value, props.isDisabled));
const classes = computed(() => togglerTheme({ state: state.value }));
</script>

<template>
  <label :tabindex="props.isDisabled ? -1 : 0" :class="classes.base()" @keydown.enter="isActive = !isActive">
    <input v-model="isActive" tabindex="-1" :disabled="props.isDisabled" :class="classes.input()" type="checkbox" />
    <span class="ball-animation" :class="classes.span()"></span>
  </label>
</template>

<style scoped>
.ball-animation {
  animation: slide-out 0.2s cubic-bezier(0.71, 0, 0.33, 1.56) forwards;
}

input:checked ~ .ball-animation {
  animation: slide-in 0.2s cubic-bezier(0.71, 0, 0.33, 1.56) forwards;
}

@keyframes slide-out {
  0% {
    transform: translateX(24px) scaleX(1);
    filter: blur(0);
  }
  40% {
    transform: translateX(22px) scaleX(1.2);
  }
  50% {
    transform: translateX(12px) scaleX(1.3);
    filter: blur(1px);
  }
  60% {
    transform: translateX(2px) scaleX(1.2);
  }
  100% {
    transform: translateX(0) scaleX(1);
    filter: blur(0);
  }
}

@keyframes slide-in {
  0% {
    transform: translateX(0) scaleX(1);
    filter: blur(0);
  }
  40% {
    transform: translateX(2px) scaleX(1.2);
  }
  50% {
    transform: translateX(12px) scaleX(1.3);
    filter: blur(1px);
  }
  60% {
    transform: translateX(22px) scaleX(1.2);
  }
  100% {
    transform: translateX(24px) scaleX(1);
    filter: blur(0);
  }
}
</style>
