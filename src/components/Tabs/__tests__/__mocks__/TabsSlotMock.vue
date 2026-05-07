<script lang="ts" setup>
import { Tab } from "../../components/Tab";
</script>

<template>
  <Tab name="first"></Tab>
  <Tab name="second"></Tab>
  <Tab name="link" :linkData="{ url: 'https://google.com', external: true }"></Tab>
</template>
