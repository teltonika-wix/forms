<script setup lang="ts">
import { Link } from '../Link';
import { Text } from '../Text';
import { interactiveLabelTheme } from './interactiveLabelTheme';
import type { InteractiveLabelProps } from './types';

const {
  external = undefined,
  url = '',
  documentTarget = undefined,
  relationship = undefined,
} = defineProps<InteractiveLabelProps>();

const classes = interactiveLabelTheme();
</script>

<template>
  <Link :external="external" :url="url" :documentTarget="documentTarget" :relationship="relationship" :class="classes">
    <Text size="s">
      <slot />
    </Text>
  </Link>
</template>
