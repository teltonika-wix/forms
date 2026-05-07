<script setup lang="ts">
import { Text } from "../../Text";
import { errorMessageTheme } from "./errorMessageTheme";

const classes = errorMessageTheme();
</script>

<template>
  <Text :class="classes.text()" size="s" weight="normal"><slot /></Text>
</template>
