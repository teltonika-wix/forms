<script setup lang="ts">
import { Image } from '../Image';
import { Text } from '../Text';
import EmptySvg from './assets/empty.svg';
import type { EmptyStateProps } from './types';

const { title = '', description = '' } = defineProps<EmptyStateProps>();
</script>

<template>
  <div class="flex w-full max-w-xs flex-col justify-center">
    <div class="flex h-20 w-auto justify-center">
      <Image :src="EmptySvg" alt="Placeholder image with teltonika logo" />
    </div>
    <div v-if="title || description" class="text-grey-600 mt-6 flex flex-col justify-center space-y-2 text-center">
      <Text v-if="title" size="l">{{ title }}</Text>
      <Text v-if="description">{{ description }}</Text>
    </div>
  </div>
</template>
