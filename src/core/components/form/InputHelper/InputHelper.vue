<script setup lang="ts">
import { Counter } from "../Counter";
import { ErrorMessage, ErrorMessageIcon } from "../ErrorMessage";
import type { InputHelperProps } from "./types";

const { errorMessage, valueLength, maxValueLength } = defineProps<InputHelperProps>();
</script>

<template>
  <div class="mt-1 grid grid-cols-[min-content_auto_min-content] gap-x-1">
    <div><ErrorMessageIcon v-if="errorMessage" class="mt-0.5" /></div>
    <div>
      <ErrorMessage v-if="errorMessage">{{ errorMessage }}</ErrorMessage>
    </div>
    <Counter
      v-if="maxValueLength"
      class="text-end"
      :current="valueLength || 0"
      :max="maxValueLength"
    ></Counter>
  </div>
</template>
