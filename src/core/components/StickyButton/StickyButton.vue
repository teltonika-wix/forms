<script setup lang="ts">
import { Button } from '../Button';
import type { ButtonEmits, ButtonProps } from '../Button/types';

const { size = 'medium', ...restProps } = defineProps<ButtonProps>();
const allProps = { ...restProps, size };

const emits = defineEmits<ButtonEmits>();
</script>

<template>
  <div
    key="sticky-wrapper"
    class="slideInAnimation group fixed right-0 top-24 overflow-visible"
    style="writing-mode: vertical-rl"
  >
    <Button class="duration-0" v-bind="allProps" @click="emits('click', $event)"><slot /></Button>
  </div>
</template>

<style scoped>
@keyframes slideInFromRight {
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(0);
  }
}

.slideInAnimation {
  animation: 0.2s ease-out 0s 1 slideInFromRight;
}
</style>
