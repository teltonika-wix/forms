<script setup lang="ts">
import { Text } from '../../Text';
import type { CounterProps } from './types';

const { current = 0, max } = defineProps<CounterProps>();
</script>

<template>
  <Text class="text-grey-600 whitespace-nowrap" size="xs" weight="normal">{{ current }} / {{ max }}</Text>
</template>
