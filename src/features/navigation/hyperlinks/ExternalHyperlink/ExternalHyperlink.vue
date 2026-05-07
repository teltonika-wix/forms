<script setup lang="ts">
import { ArrowTopRightOnSquareIcon } from '@heroicons/vue/24/solid';
import { TextLink } from 'src/legacy/core';
import type { ExternalHyperlinkProps } from './types';
import type { ExtractPublicPropTypes } from 'vue';

const { url = '', enableVisitedStyles } = defineProps<ExtractPublicPropTypes<ExternalHyperlinkProps>>();
const props = { url, enableVisitedStyles };
</script>

<template>
  <TextLink class="inline-flex items-center" external v-bind="props"
    ><slot /><ArrowTopRightOnSquareIcon class="ml-1 size-4"
  /></TextLink>
</template>
