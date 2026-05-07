<script setup lang="ts">
import type { BaseFormComponentProps } from '../../../types';

const { formInputData } = defineProps<BaseFormComponentProps>();
const { attributes, defaultValue } = formInputData;
const { id, name } = attributes;
</script>

<template>
  <input :id="id" :name="name" :value="defaultValue" type="text" hidden readonly />
</template>
