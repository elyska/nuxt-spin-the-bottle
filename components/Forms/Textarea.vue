<script setup lang="ts">
import { useField } from "vee-validate";

const props = withDefaults(
  defineProps<{
    name: string;
    rows?: number;
    label?: string;
    placeholder?: string;
    value?: string;
  }>(),
  {
    rows: 5,
  }
);

const { value, errorMessage, handleBlur, handleChange } = useField(
  props.name,
  undefined,
  { initialValue: props.value }
);
</script>

<template>
  <div>
    <label v-if="label" class="block font-bold mb-2 text-sm">
      {{ label }}
    </label>
    <textarea
      :id="name"
      :name="name"
      :rows="rows"
      :value="value"
      :data-cy="name"
      class="block w-full text-sm bg-white max-h-[200px] min-h-auto resize-none px-3 py-2 outline-none rounded-lg mb-3 border border-slate-300"
      :placeholder="placeholder"
      @input="handleChange"
      @blur="handleBlur"
    />

    <ErrorMessage v-if="errorMessage">
      {{ errorMessage }}
    </ErrorMessage>
  </div>
</template>

<style scoped></style>
