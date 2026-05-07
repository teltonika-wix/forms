<script setup lang="ts">
import { HtmlStringParser } from 'src/utilities';
import { TextLink } from 'src/legacy/core/components/TextLink';
import type { CheckboxLabelProps } from './types';

const { labelText } = defineProps<CheckboxLabelProps>();
const { tagName, tagAttributes, innerContent, stringBeforeTag, stringAfterTag } =
  HtmlStringParser.parseStringWithHtml(labelText);

const isExternal = tagName ? tagAttributes?.target === '_blank' : false;
const linkUrl = tagAttributes?.href || '';
</script>

<template>
  <span v-if="tagName === 'a'">
    {{ stringBeforeTag }}
    <TextLink :url="linkUrl" :external="isExternal" v-bind="tagAttributes"> {{ innerContent }} </TextLink
    >{{ stringAfterTag }}
  </span>
  <template v-else>
    {{ labelText }}
  </template>
</template>
