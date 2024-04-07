<script setup lang="ts">
import type { ButtonTheme } from "~/types/button.types";

const props = withDefaults(
  defineProps<{
    theme?: ButtonTheme;
  }>(),
  {
    theme: "primary",
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
    type="button"
    id="play"
    class="pushable drop-shadow-md"
    :class="btnClasses"
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

.pushable:active .pushable-front {
  transform: translateY(-2px);
}
</style>
