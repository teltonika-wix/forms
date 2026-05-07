<script setup lang="ts">
import { Heading } from 'src/legacy/core/components/Heading';
import { Text } from 'src/legacy/core/components/Text';

const { title, message } = defineProps<{ title: string; message: string }>();
</script>

<template>
  <div class="flex h-full min-h-[inherit] flex-col items-center justify-center">
    <div class="mb-6">
      <slot name="icon" />
    </div>
    <Heading size="s" class="mb-2">{{ title }}</Heading>
    <Text class="mb-2">{{ message }}</Text>
  </div>
</template>
