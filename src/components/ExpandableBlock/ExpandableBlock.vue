<script setup lang="ts">
import { computed, onMounted, ref } from "vue";

const isOpen = defineModel<boolean>("isOpen", { default: false });
const contentElement = ref<HTMLElement | null>(null);
const maxHeight = ref(0);

onMounted(() => {
  setMaxHeight();
});

const toggleVisibility = () => {
  isOpen.value = !isOpen.value;
};

const setMaxHeight = () => {
  if (contentElement.value) {
    maxHeight.value = contentElement.value.scrollHeight;
  }
};

const currentHeight = computed(() => (isOpen.value ? maxHeight.value : 0));
</script>

<template>
  <div>
    <div
      class="cursor-pointer select-none"
      tabindex="0"
      @click="toggleVisibility"
      @keyup.enter="toggleVisibility"
    >
      <slot name="head" :isOpen="isOpen"> </slot>
    </div>

    <div
      ref="contentElement"
      :style="{ height: `${currentHeight}px` }"
      class="overflow-hidden transition-all duration-200"
    >
      <slot name="body"></slot>
    </div>
  </div>
</template>
