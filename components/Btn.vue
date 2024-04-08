<script setup lang="ts">
import type { ButtonTheme } from "~/types/button.types";

const props = withDefaults(
  defineProps<{
    theme?: ButtonTheme;
    type?: "button" | "submit" | "reset";
    disabled?: boolean;
  }>(),
  {
    theme: "primary",
    type: "button",
    disabled: false,
  }
);

const btnClasses = computed(() => {
  const themeClasses = {
    primary: "bg-green-800",
    error: "bg-red-800",
  };

  return themeClasses[props.theme];
});

const spanClasses = computed(() => {
  const themeClasses = {
    primary: "bg-green-500/[0.7]",
    error: "bg-red-500/[0.7]",
  };

  return themeClasses[props.theme];
});
</script>

<template>
  <button
    :type="type"
    class="pushable drop-shadow-md disabled:bg-gray-700"
    :class="btnClasses"
    :disabled="disabled"
  >
    <span
      class="font-bangers tracking-wider text-2xl pushable-front"
      :class="spanClasses"
    >
      <slot />
    </span>
  </button>
</template>

<style scoped>
.pushable {
  border-radius: 12px;
  border: none;
  padding: 0;
  cursor: pointer;
  outline-offset: 4px;
}
.pushable-front {
  display: block;
  padding: 12px 42px;
  border-radius: 12px;
  color: white;
  transform: translateY(-6px);
  transition: transform 0.2s;
}

.pushable:active:not(:disabled) .pushable-front {
  transform: translateY(-2px);
}

.pushable:disabled {
  cursor: not-allowed;
}
.pushable:disabled .pushable-front {
  @apply bg-gray-400/[0.8];
}
</style>
