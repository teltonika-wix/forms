<script setup lang="ts">
import { arrow, flip, offset, shift, useFloating } from '@floating-ui/vue';
import { useAttributes } from 'src/vue-utils';
import type { TooltipProps } from './types';
import { type GetArrowStylesParams, getArrowStyles } from './utils/getArrowStyles';
import { computed, ref, watch } from 'vue';

defineOptions({
  inheritAttrs: false,
});

const { placement = 'top', dataTestId = 0 } = defineProps<TooltipProps>();

const reference = ref(null);
const floating = ref(null);
const floatingArrow = ref(null);
const isHidden = ref(true);
const isFlipped = ref(false);

const { floatingStyles, middlewareData } = useFloating(reference, floating, {
  placement: computed(() => placement),
  middleware: [offset(6), flip(), shift({ padding: 8 }), arrow({ element: floatingArrow })],
});
const attributes = useAttributes({ tabindex: 0 });

const hide = () => {
  isHidden.value = true;
};

const show = () => {
  isHidden.value = false;
};

watch(
  () => middlewareData.value,
  (newVal) => {
    isFlipped.value = (typeof newVal?.flip === 'object' && Object.keys(newVal?.flip).length !== 0) || false;
  },
);
const arrowStyles = computed(() => {
  const params: GetArrowStylesParams = {
    toolTipPlacement: placement,
    x: middlewareData.value.arrow?.x,
    y: middlewareData.value.arrow?.y,
    isFlipped: isFlipped.value,
  };

  return getArrowStyles(params);
});
</script>

<template>
  <div
    ref="reference"
    class="inline-block cursor-pointer"
    :data-testid="`tooltip-reference-${dataTestId}`"
    v-bind="attributes"
    @mouseenter="show"
    @mouseleave="hide"
    @focus="show"
    @blur="hide"
  >
    <slot />
  </div>
  <div
    v-if="!isHidden"
    ref="floating"
    :data-testid="`tooltip-floating-${dataTestId}`"
    :style="floatingStyles"
    class="shadow-shadow-3 bg-grey-800 dark:text-grey-800 z-10 rounded px-4 py-2 text-sm text-white dark:bg-white"
  >
    {{ content }}
    <div
      ref="floatingArrow"
      :data-testid="`tooltip-arrow-${dataTestId}`"
      class="bg-grey-800 absolute h-2 w-2 rotate-45 dark:bg-white"
      :style="arrowStyles"
    />
  </div>
</template>
