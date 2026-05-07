<script lang="ts" setup>
import type { RemoveTab, TabData, UpsertTab } from '../../types';
import type { TabProps } from './types';
import { type Ref, computed, inject, onBeforeUnmount, onMounted, ref } from 'vue';

const { name = '' } = defineProps<TabProps>();

const upsertTab = inject<UpsertTab>('upsertTab');
const removeTab = inject<RemoveTab>('removeTab');
const activeTabName = inject<Ref<string>>('activeTabName');
const tabs = inject<Ref<TabData[]>>('tabs');

const refTab = ref();

const currentTab = computed(() => tabs?.value.find((tab) => tab.name === name));

onMounted(() => {
  const children = Array.from(refTab.value.parentElement.children);
  const index = children.indexOf(refTab.value);

  if (!upsertTab) {
    return;
  }

  upsertTab(index, {
    name,
  });
});

onBeforeUnmount(() => {
  if (!removeTab) {
    return;
  }

  removeTab(name);
});
</script>

<template>
  <div v-show="currentTab?.name === activeTabName" ref="refTab">
    <slot />
  </div>
</template>
