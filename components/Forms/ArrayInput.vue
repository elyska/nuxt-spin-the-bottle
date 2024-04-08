<script setup lang="ts">
import { XMarkIcon } from "@heroicons/vue/20/solid";

const props = withDefaults(
  defineProps<{
    name: string;
    label?: string;
    placeholder?: string;
    required?: boolean;
  }>(),
  {
    placeholder: "",
    required: false,
  }
);
const modelValue = ref();
const { handleChange, errorMessage } = useField(props.name);
</script>

<template>
  <div>
    <label v-if="label" class="font-bold mb-2 text-sm">
      {{ label }}
    </label>
    <TagsInputRoot
      v-model="modelValue"
      :name="name"
      class="flex gap-2 items-center border p-2 rounded-lg w-full flex-wrap bg-white"
      :class="[errorMessage ? 'border-red-400' : '']"
      :required="required"
      @update:modelValue="handleChange"
    >
      <TagsInputItem
        v-for="item in modelValue"
        :key="item"
        :value="item"
        class="text-white flex shadow-md items-center justify-center gap-2 bg-tres-blue aria-[current=true]:bg-tres-blue-500 rounded p-1"
      >
        <TagsInputItemText class="text-sm pl-1" />
        <TagsInputItemDelete
          class="p-0.5 rounded bg-transparent hover:bg-white/[0.2] transition"
        >
          <XMarkIcon class="text-white w-5" />
        </TagsInputItemDelete>
      </TagsInputItem>

      <TagsInputInput
        :placeholder="placeholder"
        class="text-sm focus:outline-none flex-1 rounded bg-transparent px-1"
      />
    </TagsInputRoot>

    <ErrorMessage v-if="errorMessage">
      {{ errorMessage }}
    </ErrorMessage>
  </div>
</template>
