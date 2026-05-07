<script setup lang="ts">
import { GoogleClickIdStorage } from 'src/elements/GoogleClickId/stores/GoogleClickIdStorage';
import type { BaseFormComponentProps } from '../../../types';
import { onMounted, ref } from 'vue';

const { formInputData } = defineProps<BaseFormComponentProps>();
const { attributes, defaultValue } = formInputData;
const { id, name } = attributes;
const inputValue = ref(defaultValue);

onMounted(() => {
  const googleClickId = GoogleClickIdStorage.getId();

  if (googleClickId) {
    inputValue.value = googleClickId;
  }
});
</script>

<template>
  <input :id="id" :name="name" :value="inputValue" type="text" hidden readonly />
</template>
