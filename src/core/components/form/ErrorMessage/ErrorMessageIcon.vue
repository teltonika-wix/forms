<script setup lang="ts">
import { ExclamationTriangleIcon } from '@heroicons/vue/24/solid';
import { errorMessageTheme } from './errorMessageTheme';

const classes = errorMessageTheme();
</script>

<template>
  <ExclamationTriangleIcon :class="classes.icon()" />
</template>
