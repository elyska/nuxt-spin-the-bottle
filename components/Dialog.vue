<script setup lang="ts">
import { TrophyIcon } from "@heroicons/vue/20/solid";

defineProps<{
  player: string;
}>();

const store = useQuestionsStore();
const gameStore = useGameStore();

const question = ref();
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
        <DialogTitle class="m-0 text-xl font-semibold">
          <TrophyIcon class="w-6 text-yellow-400 inline mr-2" />{{ player }}'s
          turn
        </DialogTitle>
        <DialogDescription v-if="question" class="leading-normal">
          {{ question }}
        </DialogDescription>

        <div v-if="!question" class="flex gap-4">
          <Btn
            class="flex-grow outline-none"
            type="button"
            @click="question = store.getTruth()"
            >Truth</Btn
          >
          <Btn
            theme="error"
            class="flex-grow"
            @click="question = store.getDare()"
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
