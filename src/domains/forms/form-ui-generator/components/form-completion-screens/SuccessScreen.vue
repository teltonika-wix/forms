<script setup lang="ts">
import { CheckCircleIcon } from '@heroicons/vue/24/solid';
import ScreenLayout from './ScreenLayout.vue';

const { title, message } = defineProps<{ title: string; message: string }>();
</script>

<template>
  <ScreenLayout id="success-screen" :title="title" :message="message">
    <template #icon>
      <CheckCircleIcon class="size-16 text-green-500" />
    </template>
  </ScreenLayout>
</template>
