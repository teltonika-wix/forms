<script setup lang="ts">
import { tv } from "tailwind-variants";
import { Text } from "../../Text";
import { INPUT_LABEL_THEME } from "./InputLabelTheme";
import type { InputLabelProps } from "./types";
import { geLabelColorVariant } from "./utils/getLabelColorVariant";
import { computed, toRefs } from "vue";

const props = defineProps<InputLabelProps>();
const { error, disabled } = toRefs(props);

const color = geLabelColorVariant(error.value, disabled.value);

const labelTheme = tv(INPUT_LABEL_THEME);
const labelClasses = computed(() => labelTheme({ color }));
</script>

<template>
  <Text tag="label" size="xs" :label-for="labelFor" :class="labelClasses"><slot /></Text>
</template>
