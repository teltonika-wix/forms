<script setup lang="ts">
import { XCircleIcon } from '@heroicons/vue/24/solid';
import ScreenLayout from './ScreenLayout.vue';

const { title, message } = defineProps<{ title: string; message: string }>();
</script>

<template>
  <ScreenLayout :title="title" :message="message">
    <template #icon>
      <XCircleIcon class="size-16 text-pink-700" />
    </template>
  </ScreenLayout>
</template>
