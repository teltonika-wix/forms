<script setup lang="ts">
import { GoogleClickIdStorage } from "./stores/GoogleClickIdStorage";
import { extractGoogleClickIdParams } from "./utils/extractGoogleClickIdParams";
import { onMounted } from "vue";

onMounted(() => {
  const params = extractGoogleClickIdParams();

  if (params) {
    GoogleClickIdStorage.storeId(params);
  }
});
</script>

<template><template></template></template>
