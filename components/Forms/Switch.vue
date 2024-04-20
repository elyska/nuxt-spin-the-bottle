<script setup lang="ts">
import { useField } from "vee-validate";

const props = withDefaults(
  defineProps<{
    name: string;
    label?: string;
    value?: boolean;
    disabled?: boolean;
    placeholder?: string;
  }>(),
  {
    value: false,
  }
);

const { handleChange } = useField(props.name, undefined, {
  initialValue: props.value,
});
</script>

<template>
  <div class="flex gap-4 items-center justify-center">
    <SwitchRoot
      :id="name"
      :name="name"
      class="w-[42px] h-[25px] flex bg-black/50 shadow-sm rounded-full relative data-[state=checked]:bg-tres-blue cursor-pointer disabled:cursor-not-allowed"
      :disabled="disabled"
      @update:checked="handleChange"
    >
      <SwitchThumb
        class="block w-[21px] h-[21px] my-auto bg-white shadow-sm rounded-full transition-transform duration-100 translate-x-0.5 will-change-transform data-[state=checked]:translate-x-[19px]"
      />
    </SwitchRoot>
    <label
      class="text-white text-[15px] leading-none pr-[15px] select-none"
      :for="name"
    >
      {{ label }}
    </label>
  </div>
</template>
