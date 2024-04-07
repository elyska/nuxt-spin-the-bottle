<script setup lang="ts">
const { hasFinishLoading, progress, items } = await useProgress();

const gameStarted = ref(false);
const play = ref(false);
const showPlay = ref(false);

function handleSelected() {
  showPlay.value = true;
}
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
  </div>
  <Btn
    v-if="showPlay"
    @click="play = true"
    class="z-[1] absolute bottom-4 right-4"
  >
    Play
  </Btn>

  <GameScene
    @selected="handleSelected"
    :game-started="gameStarted"
    :play="play"
  />
</template>
