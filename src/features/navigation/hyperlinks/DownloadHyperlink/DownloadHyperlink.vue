<script setup lang="ts">
import { ArrowDownTrayIcon } from "@heroicons/vue/24/solid";
import { TextLink, type TextLinkProps } from "src/legacy/core";
import type { ExtractPublicPropTypes } from "vue";

const {
  url = "",
  external,
  enableVisitedStyles,
} = defineProps<ExtractPublicPropTypes<TextLinkProps>>();
const props = { url, external, enableVisitedStyles };
</script>

<template>
  <TextLink class="inline-flex items-center" v-bind="props"
    ><slot /><ArrowDownTrayIcon class="ml-1 size-4"
  /></TextLink>
</template>
