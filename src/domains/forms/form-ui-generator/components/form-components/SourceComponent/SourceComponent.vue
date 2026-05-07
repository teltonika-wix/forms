<script setup lang="ts">
import type { SourceComponentProps } from './types';

const { formInputData, clientFullUrl } = defineProps<SourceComponentProps>();
const { attributes } = formInputData;
const { id, name } = attributes;
</script>

<template>
  <input :id="id" :name="name" :value="clientFullUrl" type="text" hidden readonly />
</template>
