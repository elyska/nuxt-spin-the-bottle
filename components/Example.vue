<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    prop: string;
  }>(),
  {
    prop: "example",
  }
);
</script>

<template></template>

<style scoped></style>
