<script setup lang="ts">
import { isSlotEmpty } from 'src/vue-utils';
import { Text } from '../../Text';
import { checkboxWrapperTheme } from './checkboxWrapperTheme';
import type { CheckboxWrapperProps } from './types';
import { computed, useSlots } from 'vue';

const { size, id } = defineProps<CheckboxWrapperProps>();
const textSize = computed(() => {
  return size === 'small' ? 's' : 'm';
});

const slots = useSlots();

const classes = checkboxWrapperTheme();
</script>

<template>
  <div :class="classes.root()">
    <slot v-if="!isSlotEmpty(slots.checkbox)" name="checkbox" />
    <Text v-if="!isSlotEmpty(slots.label)" :size="textSize" :class="classes.label()" tag="label" :for="id">
      <slot name="label" />
    </Text>
    <slot v-if="!isSlotEmpty(slots.errorMessage)" name="errorMessage" />
  </div>
</template>

<style scoped></style>
