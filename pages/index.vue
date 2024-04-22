<script setup lang="ts">
import * as zod from "zod";

const { progress, hasFinishLoading } = await useProgress();

const store = useGameStore();
const questionsStore = useQuestionsStore();

const showSplash = ref(true);
const play = ref(false);

const validationSchema = toTypedSchema(
  zod.object({
    players: zod.array(zod.string()).min(2, "Add at least two players."),
    personalise: zod.boolean().default(false),
    systemPrompt: zod.string().optional(),
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
    if (values.personalise) {
      questionsStore.prompt = values.systemPrompt;
    }
  },
  (err) => {
    console.error(err.errors);
  }
);
</script>

<template>
  <div
    v-if="showSplash"
    class="z-[1] bg-black absolute flex items-center justify-center flex-col min-h-full w-full gap-4 py-12"
  >
    <NeonSign>
      Spin <br />
      the Bottle
    </NeonSign>
    <PlayersMap
      v-if="values.players?.length && values.players.length > 1"
      :players="values.players"
    />
    <form
      @submit.prevent="start"
      class="flex items-center justify-center flex-col w-full gap-16 sm:w-3/4 lg:w-1/2 max-w-xl p-6"
    >
      <fieldset class="flex flex-col w-full gap-12">
        <FormsArrayInput name="players" placeholder="Players..." />
        <FormsSwitch
          v-if="values.players?.length && values.players.length > 1"
          name="personalise"
          label="Personalise game"
          :disabled="!(values.players && values.players.length > 1)"
        />

        <FormsTextarea
          v-if="values.personalise"
          name="systemPrompt"
          placeholder="Describe the relationships between players, the environment, the type of questions you want to generate..."
        />
        <TestCustomPrompt
          v-if="values.systemPrompt"
          :players="values.players || []"
          :prompt="values.systemPrompt"
        />
      </fieldset>
      <Btn type="submit" theme="primary" :shadows="true"> Start </Btn>
    </form>
  </div>

  <Dialog :player="store.player" />

  <Btn
    v-if="store.bottle && !play"
    @click="play = true"
    class="z-[1] absolute bottom-4 right-4"
  >
    Play
  </Btn>
  <div v-if="store.spinning" class="absolute w-full h-full">
    <PlayersMap
      :players="store.players"
      class="z-[10] w-full xl:w-1/2 max-w-2xl absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none"
    />
  </div>

  <div
    v-if="!hasFinishLoading"
    class="z-[1] bg-black absolute top-0 left-0 right-0 flex items-center justify-center flex-col h-full w-full gap-16"
  >
    <div class="w-2/3 md:w-1/3">
      <LoadingProgress :key="progress" :percentage="progress" />
    </div>
  </div>
  <GameScene v-if="!play" />
  <GameSpinTheBottle v-if="play" />
</template>

<style scoped></style>
