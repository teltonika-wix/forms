<script lang="ts" setup>
import { isSlotEmpty, useAttributes } from 'src/vue-utils';
import { extractLinkAttrs } from '../Link';
import { defaultVariants, linkStyledAsButtonTheme } from './linkStyledAsButtonTheme';
import { type LinkStyledAsButtonProps } from './types';
import { computed, useSlots } from 'vue';

const {
  size = defaultVariants['size'],
  color = defaultVariants['color'],
  width = defaultVariants['width'],
  external,
  documentTarget,
  relationship,
  disabled,
  url = '/',
  ariaLabel,
} = defineProps<LinkStyledAsButtonProps>();
const slots = useSlots();

const classes = computed(() =>
  linkStyledAsButtonTheme({
    size,
    color,
    width,
    isButtonText: !isSlotEmpty(slots.default),
    disabled,
  }),
);

const defaultAnchorAttrs = computed(() => {
  return extractLinkAttrs({
    external,
    url,
    documentTarget,
    relationship,
    ariaLabel,
  });
});
const attributes = computed(() => useAttributes(defaultAnchorAttrs.value));

const rootClasses = computed(() => {
  const allClasses = [classes.value.base()];

  if (disabled) {
    allClasses.push('disabled');
  }

  return allClasses;
});
</script>

<template>
  <a :class="rootClasses" v-bind="attributes">
    <span v-if="!isSlotEmpty(slots.startIcon)" :class="classes.startIcon()">
      <slot name="startIcon" class="text-inherit"></slot>
    </span>
    <span v-if="!isSlotEmpty(slots.default)" :class="classes.buttonText()">
      <slot />
    </span>
    <span v-if="!isSlotEmpty(slots.endIcon)" :class="classes.endIcon()">
      <slot name="endIcon"></slot>
    </span>
  </a>
</template>
