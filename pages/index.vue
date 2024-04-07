<script setup lang="ts"></script>

<template>
  <div
    class="container mx-auto flex items-center justify-center flex-col h-[100vh] gap-16"
  >
    <Heading> Spin the Bottle </Heading>

    <div class="w-1/4">
      <Loader :percentage="100" />
    </div>

    <Btn :disabled="true"> Start </Btn>
  </div>
</template>
