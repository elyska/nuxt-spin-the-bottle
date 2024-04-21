<script setup lang="ts">
import { ExclamationTriangleIcon } from "@heroicons/vue/20/solid";
</script>
<template>
  <p class="text-sm text-red-600 rounded-md py-1 px-2 mt-1">
    <ExclamationTriangleIcon class="w-4 inline" /> <slot />
  </p>
</template>
