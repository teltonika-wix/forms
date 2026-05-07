<script lang="ts" setup>
import { Link } from '../Link';
import type { LinkStyledAsIconProps } from './types';

const { external, url = '/', documentTarget, relationship } = defineProps<LinkStyledAsIconProps>();
</script>

<template>
  <Link :external="external" :url="url" :document-target="documentTarget" :relationship="relationship">
    <slot />
  </Link>
</template>
