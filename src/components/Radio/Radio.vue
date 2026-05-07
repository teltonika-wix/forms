<script setup lang="ts">
import { type RadioSize, radioTheme } from "./radioTheme";
import { computed } from "vue";

const { size, value } = defineProps<{
  id: string;
  size?: RadioSize;
  label?: string;
  name?: string;
  value?: string;
}>();

const model = defineModel<string>();

const isSelected = computed(() => {
  return model.value === value;
});

const classes = computed(() => {
  return radioTheme({
    size,
    isSelected: isSelected.value,
  });
});

const selectCurrentValue = (): void => {
  model.value = value;
};
</script>

<template>
  <div>
    <div
      class="group inline-flex cursor-pointer gap-2 rounded-sm focus-visible:ring-2 focus-visible:ring-blue-600 dark:outline-blue-600"
      tabindex="0"
      @keypress.enter="selectCurrentValue"
      @click="selectCurrentValue"
    >
      <div :class="classes.inputContainer()">
        <input
          :id="id"
          v-model="model"
          tabindex="-1"
          type="radio"
          :name="name"
          :value="value"
          :class="classes.base()"
        />
      </div>

      <label v-if="label" :for="id" :class="classes.label()">
        {{ label }}
      </label>
    </div>
  </div>
</template>
