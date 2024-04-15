<script setup lang="ts">
defineProps<{
  percentage: number;
}>();
</script>

<template>
  <div class="bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
    <div
      class="h-2.5 rounded-full transition-all transition duration-700 bg-red-400"
      :style="`width: ${percentage}%`"
    ></div>
    <p
      class="font-bangers text-2xl text-right text-red-400"
    >
      {{ percentage }} %
    </p>
  </div>
</template>

<style scoped></style>
