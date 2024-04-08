<script setup lang="ts">
import * as zod from "zod";

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

const validationSchema = toTypedSchema(
  zod.object({
    players: zod.array(zod.string()).min(2, "Add at least two players."),
  })
);
const { values, handleSubmit } = useForm({
  validationSchema,
});

const start = handleSubmit(
  (values) => {
    showSplash.value = false;
    store.gameStarted = true;
    store.players = values.players;
  },
  (err) => {
    console.error(err.errors);
  }
);
</script>

<template>
  <div
    v-if="showSplash"
    class="z-[1] backdrop-blur-md absolute flex items-center justify-center flex-col h-full w-full gap-4"
  >
    <Heading> Spin the Bottle </Heading>
    <!-- <PlayersMap :players="['rtyasx', 'asd', 'qwe', ]" /> -->
    <PlayersMap v-if="values.players?.length && values.players.length > 1" :players="values.players" />
    <form
      @submit.prevent="start"
      class="flex items-center justify-center flex-col w-full gap-12 max-w-7xl"
    >
      <FormsArrayInput name="players" placeholder="Players..." class="w-3/4 md:w-1/3" />
      <Btn type="submit"> Start </Btn>
    </form>
  </div>

  <!-- <div
    v-if="!hasFinishLoading"
    class="z-[1] bg-tres-blue absolute top-0 left-0 right-0 flex items-center justify-center flex-col h-full w-full gap-16"
  >
    <div class="w-2/3 md:w-1/3">
      <Loader :key="progress" :percentage="progress" />
    </div>
  </div> -->

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

  <!-- <GameScene />
  <GameSpinTheBottle v-if="play" /> -->
  <!-- <GameSpinTheBottle /> -->
</template>

<style scoped></style>
