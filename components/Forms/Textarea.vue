<script setup lang="ts">
import { useField } from "vee-validate";

const props = withDefaults(
  defineProps<{
    name: string;
    rows?: number | undefined;
    label?: string | undefined;
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
    <div class="relative rounded-md">
      <textarea
        :id="name"
        :name="name"
        :rows="rows"
        :data-cy="name"
        class="block w-full sm:text-sm rounded-lg bg-white dark:bg-gray-800 max-h-[200px] min-h-auto resize-none px-3 py-2 outline-none"
        :placeholder="placeholder"
        @input="handleChange"
        @blur="handleBlur"
      />
    </div>

    <ErrorMessage v-if="errorMessage">
      {{ errorMessage }}
    </ErrorMessage>
  </div>
</template>

<style scoped></style>
