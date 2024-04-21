<script setup lang="ts">
import type { ButtonTheme } from "~/types/button.types";

const props = withDefaults(
  defineProps<{
    theme?: ButtonTheme;
    type?: "button" | "submit" | "reset";
    disabled?: boolean;
    shadows?: boolean;
  }>(),
  {
    theme: "primary",
    type: "button",
    disabled: false,
  }
);

const shadowClasses = computed(() => {
  const themeClasses = {
    primary: "shadow-tres-blue/[0.6]",
    neon: "shadow-neon-pink/[0.6]",
    error: "shadow-red-500/[0.6]",
  };

  return `shadow-[0_0px_40px_15px] ${themeClasses[props.theme]}`;
});

const btnClasses = computed(() => {
  const themeClasses = {
    primary: "bg-tres-blue-500",
    neon: "bg-neon-pink-500",
    error: "bg-red-800",
  };

  return themeClasses[props.theme];
});

const spanClasses = computed(() => {
  const themeClasses = {
    primary: "bg-tres-blue/[0.6]",
    neon: "bg-neon-pink/[0.6]",
    error: "bg-red-500/[0.7]",
  };

  return themeClasses[props.theme];
});
</script>

<template>
  <button
    :type="type"
    class="pushable drop-shadow-md disabled:bg-gray-700"
    :class="[btnClasses, shadows ? shadowClasses : '']"
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
