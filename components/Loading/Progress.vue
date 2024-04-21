<script setup lang="ts">
defineProps<{
  percentage: number;
}>();
</script>

<template>
  <div class="bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
    <div
      class="h-2.5 rounded-full transition-all transition duration-700 bg-neon-pink shadow-[0_0px_30px_5px] shadow-neon-pink"
      :style="`width: ${percentage}%`"
    ></div>
    <p class="font-bangers text-2xl text-right text-neon-pink">
      {{ percentage }} %
    </p>
  </div>
</template>

<style scoped></style>
