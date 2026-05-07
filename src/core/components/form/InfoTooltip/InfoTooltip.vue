<script setup lang="ts">
import { ExclamationCircleIcon } from '@heroicons/vue/24/solid';
import { Tooltip, type TooltipProps } from '../../Tooltip';

const { placement = 'top', content, dataTestId } = defineProps<TooltipProps>();
</script>

<template>
  <Tooltip :content="content" :placement="placement" :dataTestId="dataTestId">
    <ExclamationCircleIcon class="size-6 text-blue-800 dark:text-white" />
  </Tooltip>
</template>
