<script setup lang="ts">
import { StarIcon } from '@heroicons/vue/24/solid';
import { DEFAULT_FEEDBACK_PROPS } from './feedbackConstants';
import type { FeedbackProps } from './types';
import { ref } from 'vue';

const { modelValue = DEFAULT_FEEDBACK_PROPS['value'], error, id, name } = defineProps<FeedbackProps>();

const hoverIndex = ref<number>(-1);
const list = ref<number[]>([1, 2, 3, 4, 5]);
const rating = defineModel<number>();

const removeHover = (): void => {
  hoverIndex.value = -1;
};

const handleHover = (index: number): void => {
  hoverIndex.value = index;
};

const handleClick = (ratingItem: number): void => {
  rating.value = ratingItem;
};
</script>

<template>
  <div>
    <div class="grid w-max grid-flow-col justify-start gap-4 rounded bg-gray-100 p-2" @mouseleave="removeHover">
      <input :id="id" ref="input" :name="name" :value="modelValue" class="hidden h-0 w-0 opacity-0" />
      <div v-for="(star, index) in list" :key="index" @mouseover="handleHover(index)" @click="handleClick(index + 1)">
        <StarIcon
          class="h-4 w-4 cursor-pointer"
          :class="{
            'text-gray-300': index > hoverIndex && index > rating - 1,
            'hover:text-gray-400': index > rating - 1,
            'text-blue-800': index <= rating - 1,
          }"
        ></StarIcon>
      </div>
    </div>
    <span v-if="error" class="mt-1 text-xs text-pink-700">{{ error }}</span>
  </div>
</template>

<style scoped></style>
