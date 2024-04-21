<script setup lang="ts">
withDefaults(
  defineProps<{
    shadow?: boolean;
  }>(),
  {
    shadow: false,
  }
);
</script>

<template>
  <div class="border-2 border-white" :class="shadow ? 'neon-shadow' : ''">
    <slot />
  </div>
</template>

<style scoped>
/* https://css-tricks.com/how-to-create-neon-text-with-css/ */
.neon-shadow {
  box-shadow: 0 0 3px #fff, 0 0 3.2px #fff,
    0 0 32px theme("colors.neon-pink.DEFAULT"),
    0 0 13px theme("colors.neon-pink.DEFAULT"),
    0 0 45px theme("colors.neon-pink.DEFAULT"),
    inset 0 0 21px theme("colors.neon-pink.DEFAULT");
}
</style>
