<script setup lang="ts">
import { useField } from "vee-validate";

const props = withDefaults(
  defineProps<{
    name: string;
    rows?: number;
    label?: string;
    placeholder?: string;
  }>(),
  {
    rows: 5,
  }
);

const { errorMessage, handleBlur, handleChange } = useField(props.name);
</script>

<template>
  <div>
    <label v-if="label" class="font-bold mb-2 text-sm">
      {{ label }}
    </label>
      <textarea
        :id="name"
        :name="name"
        :rows="rows"
        :data-cy="name"
        class="block w-full text-sm bg-white dark:bg-gray-800 max-h-[200px] min-h-auto resize-none px-3 py-2 outline-none rounded-lg mb-3"
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
