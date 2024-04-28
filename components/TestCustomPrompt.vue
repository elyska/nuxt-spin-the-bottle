<script setup lang="ts">
import * as zod from "zod";

const props = defineProps<{
  players: string[];
  prompt: string;
}>();

const questionsStore = useQuestionsStore();

const validationSchema = toTypedSchema(
  zod.object({
    player: zod.string(),
    type: zod.enum(["truth", "dare"]),
  })
);
const { handleSubmit } = useForm({
  validationSchema,
});

const question = ref();
const error = ref();
const questionLoading = ref(false);
const test = handleSubmit(
  async (values) => {
    questionLoading.value = true;
    try {
      question.value = await questionsStore.testPrompt(
        props.prompt,
        values.player,
        values.type
      );
    } catch (err) {
      error.value = true;
      question.value = "";
    }
    questionLoading.value = false;
  },
  (err) => {
    console.error(err.errors);
  }
);
</script>

<template>
  <form @submit.prevent="test">
    <NeonBorder class="flex flex-col gap-6 p-6 rounded-lg" :shadow="true">
      <div class="flex gap-3 items-start">
        <FormsSelect
          name="player"
          placeholder="Select player"
          :options="players"
        />
        <FormsSelect
          name="type"
          placeholder="Truth or dare"
          :options="['truth', 'dare']"
        />
      </div>
      <Btn theme="neon" type="submit">Test</Btn>
      <LoadingMessage v-if="questionLoading" colour="white" />
      <p v-else-if="question" class="text-neon-pink m-0">{{ question }}</p>
      <ErrorMessage v-if="error"
        >AI is not available at the moment</ErrorMessage
      >
    </NeonBorder>
  </form>
</template>

<style scoped></style>
