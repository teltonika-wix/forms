<script setup lang="ts">
import { Heading } from "src/legacy/core/components/Heading";
import { Text } from "src/legacy/core/components/Text";
import type { BaseFormComponentProps } from "../../../types";
import { mapToColorClasses } from "../../../utils/mapToColorClasses";
import { mapToSpacingClasses } from "../../../utils/mapToSpacingClasses";
import { extractContentProps } from "./utils/extractContentProps";

const { formInputData } = defineProps<BaseFormComponentProps>();
const { attributes, props } = formInputData;
const { id, name } = attributes;

const { textProps, headingProps, textValue } = extractContentProps(formInputData);
const spacingClasses = mapToSpacingClasses(props?.spacing);
const colorClasses = mapToColorClasses(props?.typography?.color);
</script>

<template>
  <Text
    v-if="textProps"
    :id="id"
    :size="textProps.size"
    :weight="textProps.weight"
    :tag="textProps.tag"
    :class="[colorClasses, spacingClasses]"
    :name="name"
  >
    {{ textValue }}
  </Text>
  <Heading
    v-if="headingProps"
    :id="id"
    :size="headingProps.size"
    :weight="headingProps.weight"
    :tag="headingProps.tag"
    :class="[colorClasses, spacingClasses]"
    :name="name"
  >
    {{ textValue }}
  </Heading>
</template>
