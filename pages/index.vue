<script setup lang="ts">
const { progress, items } = await useProgress();

const store = useGameStore();

const gameStarted = ref(false);
const showSplash = ref(true);
const play = ref(false);
const showPlay = ref(false);
// const showPlay = computed(() => (store.bottle ? true : false));
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

    <div class="w-1/4">
      <Loader :percentage="progress" />
    </div>
    {{ items }}
    <Btn
      :disabled="progress < 100"
      @click="
        () => {
          showSplash = false;
          gameStarted = true;
        }
      "
    >
      Start
    </Btn>
  </div>

  <div
    v-if="progress < 100 && gameStarted"
    class="z-[1] absolute top-0 left-0 right-0 container mx-auto flex items-center justify-center flex-col h-[100vh] w-full gap-16"
  >
    <div class="w-1/4">
      <Loader :percentage="progress" />
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

  <GameScene :game-started="gameStarted" :play="play" />
  <!-- <GameSpinTheBottle /> -->
  <GameSpinTheBottle v-if="play" />
</template>
