<script lang="ts" setup>
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/24/outline';
import { useScroll } from '@vueuse/core';
import { Text } from '../Text';
import type { RemoveTab, TabData, TabsProps, UpsertTab } from './types';
import { provide, ref } from 'vue';

const activeTabName = defineModel('activeTabName');
const { isHorizontalLineHidden, isHorizontalArrowScrollEnabled, alignLeft } = defineProps<TabsProps>();

const tabs = ref<TabData[]>([]);

const tabsElement = ref<HTMLElement | null>(null);

const { x: xPosition } = useScroll(tabsElement, { behavior: 'smooth' });

const upsertTab: UpsertTab = (tabIndex: number, tab: TabData) => {
  tabs.value.splice(tabIndex, 0, tab);

  const isAnyTabActive = !!activeTabName.value;

  if (!isAnyTabActive) {
    activeTabName.value = tab.name;
  }
};

const removeTab: RemoveTab = (tabName: string) => {
  tabs.value = tabs.value.filter((tab) => {
    return tab.name !== tabName;
  });
};

provide('upsertTab', upsertTab);
provide('removeTab', removeTab);
provide('activeTabName', activeTabName);
provide('tabs', tabs);

const setTabActive = (targetTab: TabData) => {
  activeTabName.value = targetTab.name;
};
</script>

<template>
  <div class="relative">
    <div
      v-if="isHorizontalArrowScrollEnabled"
      class="absolute left-0 z-10 flex cursor-pointer items-center px-4 py-3"
      @click="xPosition -= 100"
    >
      <ChevronLeftIcon class="text-grey-400 size-6" />
    </div>
    <div
      v-if="isHorizontalArrowScrollEnabled"
      class="absolute right-0 z-10 flex cursor-pointer items-center px-4 py-3"
      @click="xPosition += 100"
    >
      <ChevronRightIcon class="text-grey-400 size-6" />
    </div>
    <div :class="{ 'px-14': isHorizontalArrowScrollEnabled }">
      <div ref="tabsElement" class="invisible-scrollbar mb-6 flex overflow-x-auto md:mb-12">
        <div
          v-if="!alignLeft"
          class="border-grey-400 grow"
          :class="{
            'border-b': !isHorizontalLineHidden,
          }"
        />

        <div
          v-for="tab in tabs"
          :key="tab.name"
          class="border-grey-400 relative cursor-pointer px-4 py-3 md:px-8"
          :class="{
            'border-b': !isHorizontalLineHidden,
          }"
          @click="setTabActive(tab)"
        >
          <Text
            class="select-none text-nowrap duration-200"
            :class="{
              'text-grey-600': activeTabName !== tab.name,
              'text-grey-800': activeTabName === tab.name,
            }"
          >
            {{ tab.name }}
          </Text>

          <div
            class="absolute bottom-[-0.0625rem] left-0 h-[0.125rem] bg-blue-600 duration-200"
            :class="{
              'w-0': activeTabName !== tab.name,
              'w-full': activeTabName === tab.name,
            }"
          />
        </div>

        <div
          class="border-grey-400 grow"
          :class="{
            'border-b': !isHorizontalLineHidden,
          }"
        />
      </div>
    </div>

    <div>
      <slot />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.invisible-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
}
</style>
