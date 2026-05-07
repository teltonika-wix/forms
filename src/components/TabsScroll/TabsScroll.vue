<script setup lang="ts">
import { useDebounceFn } from '@vueuse/core';
import type { TabsScrollProps, TabsScrollTab } from './types';
import { onMounted, onUnmounted, ref } from 'vue';

const props = defineProps<TabsScrollProps>();
const { tabs, offsetTop = 0 } = props;
const activeTab = ref<string>(tabs[0]?.text || '');

const setTabActive = (tab: TabsScrollTab): void => {
  activeTab.value = tab.text;
};

const handleScroll = (): void => {
  const sections = tabs.reduce((previous, tab) => {
    const section = document.getElementById(tab.blockId);

    if (section) {
      return [...previous, section];
    }

    return previous;
  }, [] as HTMLElement[]);

  if (!sections.length) {
    return;
  }

  const sectionsTops = sections.map((section) => {
    const rect = section.getBoundingClientRect();

    return {
      top: rect.top - offsetTop,
      group: section.id,
    };
  });

  const mostVisibleSection = sectionsTops.reduce((acc, curr) => {
    const accDiff = Math.abs(acc.top);
    const currDiff = Math.abs(curr.top);

    return accDiff < currDiff ? acc : curr;
  });

  const visibleTabIndex = tabs.findIndex((tab) => tab.blockId === mostVisibleSection.group);
  const visibleTab = tabs[visibleTabIndex];

  if (visibleTab) {
    setTabActive(visibleTab);
  }
};

const debouncedScroll = useDebounceFn(handleScroll, 200);

const handleTabClick = (event: MouseEvent, tab: TabsScrollTab) => {
  const section = document.getElementById(tab.blockId);

  if (section) {
    const top = section.offsetTop - offsetTop;

    // Smooth scroll to the section
    window.scrollTo({
      top,
      behavior: 'smooth',
    });

    // Set the tab active
    setTabActive(tab);
  }
};

onMounted(() => {
  document.addEventListener('scroll', debouncedScroll);
});

onUnmounted(() => {
  document.removeEventListener('scroll', debouncedScroll);
});
</script>

<template>
  <div class="invisible-scrollbar flex overflow-x-auto">
    <div class="border-grey-400 grow border-b" />

    <div v-for="tab in tabs" :key="tab.text" class="border-grey-400 relative border-b px-4 py-3 md:px-8">
      <a
        :href="`#${tab.blockId}`"
        size="medium"
        class="cursor-pointer select-none scroll-smooth text-nowrap duration-200"
        :class="{
          'text-grey-600': activeTab !== tab.text,
          'text-grey-800': activeTab === tab.text,
        }"
        @click.prevent="handleTabClick($event, tab)"
      >
        {{ tab.text }}
      </a>

      <div
        class="absolute bottom-[-0.0625rem] left-0 h-[0.125rem] bg-blue-600 duration-200"
        :class="{
          'w-0': activeTab !== tab.text,
          'w-full': activeTab === tab.text,
        }"
      />
    </div>

    <div class="border-grey-400 grow border-b" />
  </div>
</template>

<style>
.invisible-scrollbar::-webkit-scrollbar {
  display: none;
}

.invisible-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
