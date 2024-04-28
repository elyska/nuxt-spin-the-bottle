<script setup lang="ts">
import {
  TrophyIcon,
  ArrowPathIcon,
  BookOpenIcon,
} from "@heroicons/vue/20/solid";

defineProps<{
  player: string;
}>();

const store = useQuestionsStore();
const gameStore = useGameStore();

const question = ref();
const loading = ref(false);

const questionType = ref();
async function getQuestion(type: "truth" | "dare") {
  questionType.value = type;
  loading.value = true;
  question.value = await store.getQuestion(type);
  loading.value = false;
}
async function getQuestionFromDataBank() {
  question.value = store.getQuestionFromDataBank(questionType.value);
}
</script>

<template>
  <DialogRoot v-model:open="gameStore.showDialog">
    <DialogPortal>
      <DialogOverlay class="bg-gray-800/[0.7] fixed inset-0 z-30" />
      <DialogContent
        @interact-outside="
          (event) => {
            return event.preventDefault();
          }
        "
        class="flex flex-col gap-6 fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-xl bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none z-[100]"
      >
        <div class="flex justify-between">
          <DialogTitle class="m-0 text-xl font-semibold">
            <TrophyIcon class="w-6 text-yellow-400 inline mr-2" />{{ player }}'s
            turn
          </DialogTitle>
          <div v-if="question" class="flex gap-2">
            <BookOpenIcon
              class="w-5 text-slate-400 hover:text-slate-500 transition cursor-pointer"
              @click="getQuestionFromDataBank"
            />
            <ArrowPathIcon
              class="w-5 text-slate-400 hover:text-slate-500 transition cursor-pointer"
              @click="getQuestion(questionType)"
            />
          </div>
        </div>
        <DialogDescription v-if="question" class="leading-normal">
          {{ question }}
        </DialogDescription>
        <LoadingMessage v-if="loading" />

        <div v-if="!question && !loading" class="flex gap-4">
          <Btn
            class="flex-grow outline-none"
            type="button"
            @click="getQuestion('truth')"
            >Truth</Btn
          >
          <Btn theme="error" class="flex-grow" @click="getQuestion('dare')"
            >Dare</Btn
          >
        </div>
        <DialogClose v-if="question" aria-label="Close">
          <Btn class="w-full" @click="question = null">Completed</Btn>
        </DialogClose>
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
</template>
