<script setup lang="ts">
import { Field } from "src/legacy/core/components/form/Field";
import { InputHelper } from "src/legacy/core/components/form/InputHelper";
import { extractInputValue } from "../utils/extractInputValue";
import type { InputFieldProps, InputFiledEmits } from "./types";
import { toRefs } from "vue";

const props = defineProps<InputFieldProps>();
const emits = defineEmits<InputFiledEmits>();
const { inputValue, error, maxLength, label, comment, disabled, readonly, name, id, placeholder } =
  toRefs(props);

const valueUpdateHandler = (event: Event) => {
  const value = extractInputValue(event);
  emits("onValueUpdate", event, value);
};
</script>

<template>
  <div>
    <Field
      :error="error"
      :label="label"
      :comment="comment"
      :valueLength="inputValue?.length"
      :disabled="disabled"
      :readonly="readonly"
      :labelFor="id"
    >
      <input
        :id="id"
        :value="inputValue"
        :name="name"
        type="text"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly"
        :maxLength="maxLength"
        class="block w-full appearance-none bg-transparent text-current outline-none"
        @input="valueUpdateHandler"
      />
    </Field>
    <InputHelper
      v-if="error || maxLength"
      class="mt-1"
      :errorMessage="error"
      :valueLength="inputValue?.length"
      :maxValueLength="maxLength"
    />
  </div>
</template>
