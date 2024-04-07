<script setup lang="ts">
const { hasFinishLoading, progress, items } = await useProgress();

const gameStarted = ref(false);
</script>

<template>
  <div
    v-if="!gameStarted"
    class="z-[1] absolute top-0 left-0 right-0 container mx-auto flex items-center justify-center flex-col h-[100vh] w-full gap-16"
  >
    <Heading> Spin the Bottle </Heading>

    <div class="w-1/4">
      <Loader :percentage="progress" />
    </div>

    <Btn :disabled="progress < 100" @click="gameStarted = true"> Start </Btn>
    {{ items }}
    {{ hasFinishLoading }}
  </div>
  <GameKitchen />
</template>
