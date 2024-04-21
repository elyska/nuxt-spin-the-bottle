<script setup lang="ts"></script>

<template>
  <div
    class="neon-border rounded-2xl p-12"
  >
    <slot />
  </div>
</template>

<style scoped>
/* https://css-tricks.com/how-to-create-neon-text-with-css/ */
.neon-border {
  border: 0.2rem solid #fff;
  box-shadow: 0 0 0.2rem #fff, 0 0 0.2rem #fff, 0 0 2rem #f09,
    0 0 0.8rem #f09, 0 0 2.8rem #f09, inset 0 0 1.3rem #f09
}
</style>
