<script setup lang="ts">
import { type ImageProps } from './types';
import { setImageAttributes } from './utils/setImageAttributes';
import { computed } from 'vue';

const { src, srcSetSizes, alt, lazyLoad = true, sizes, width, height } = defineProps<ImageProps>();

const imageAttributes = computed(() => {
  return setImageAttributes({ src, srcSetSizes, alt, lazyLoad, sizes, width, height });
});
</script>

<template>
  <img class="bg-blue" v-bind="imageAttributes" />
</template>
