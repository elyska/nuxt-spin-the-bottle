<script setup lang="ts">
const { progress, hasFinishLoading } = await useProgress();

const store = useGameStore();

const showSplash = ref(true);
const play = ref(false);
const showPlay = ref(false);

watch(
  () => store.bottle,
  () => {
    if (store.bottle) {
      showPlay.value = true;
    }
  }
);
</script>

<template>
  <div
    v-if="showSplash"
    class="z-[1] absolute top-0 left-0 right-0 container mx-auto flex items-center justify-center flex-col h-[100vh] w-full gap-16"
  >
    <Heading> Spin the Bottle </Heading>

    <div class="w-2/3 md:w-1/4">
      <Loader :percentage="progress" />
    </div>
    <Btn
      :disabled="progress < 100"
      @click="
        () => {
          showSplash = false;
          store.gameStarted = true;
        }
      "
    >
      Start
    </Btn>
  </div>

  <div
    v-if="!hasFinishLoading && play"
    class="z-[1] absolute top-0 left-0 right-0 container mx-auto flex items-center justify-center flex-col h-[100vh] w-full gap-16"
  >
    <div class="w-2/3 md:w-1/4">
      <Loader :key="progress" :percentage="progress" />
    </div>
  </div>

  <Btn
    v-if="showPlay"
    @click="
      () => {
        play = true;
        showPlay = false;
      }
    "
    class="z-[1] absolute bottom-4 right-4"
  >
    Play
  </Btn>

  <GameScene />
  <!-- <GameSpinTheBottle /> -->
  <GameSpinTheBottle v-if="play" />
</template>
