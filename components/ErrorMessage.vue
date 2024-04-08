<script setup lang="ts">
import { ExclamationTriangleIcon } from "@heroicons/vue/20/solid";
</script>
<template>
  <p class="text-sm text-red-400 bg-red-100 rounded-md py-1 px-2 my-2">
    <ExclamationTriangleIcon class="w-4 inline" /> <slot />
  </p>
</template>
