<script setup lang="ts">
import * as zod from "zod";
import { Cog8ToothIcon, XMarkIcon } from "@heroicons/vue/24/outline";

const questionsStore = useQuestionsStore();

const validationSchema = toTypedSchema(
  zod.object({
    systemPrompt: zod.string().optional(),
    generateByAI: zod.boolean(),
  })
);
const { handleSubmit } = useForm({
  validationSchema,
});

const open = ref(false);
const save = handleSubmit(
  (values) => {
    questionsStore.prompt = values.systemPrompt;
    questionsStore.generateByAI = values.generateByAI;
    open.value = false;
  },
  (err) => {
    console.error(err.errors);
  }
);
</script>

<template>
  <DialogRoot v-model:open="open">
    <DialogTrigger
      class="absolute top-4 right-4 z-[1] bg-white rounded-full p-1 shadow-lg"
    >
      <Cog8ToothIcon
        class="w-7 text-tres-blue hover:text-tres-blue-500 transition"
      />
    </DialogTrigger>
    <DialogPortal>
      <DialogOverlay class="bg-gray-800/[0.7] fixed inset-0 z-30" />
      <DialogContent
        class="flex flex-col gap-6 fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-xl bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none z-[100]"
      >
        <DialogTitle class="mb-2 text-xl font-semibold"> Settings </DialogTitle>

        <form @submit.prevent="save" class="space-y-6">
          <FormsSwitch name="generateByAI" :value="questionsStore.generateByAI">
            <template #label>
              <span class="text-black">Generate questions by AI</span>
            </template>
          </FormsSwitch>
          <FormsTextarea
            name="systemPrompt"
            label="Custom prompt"
            :value="questionsStore.prompt"
            placeholder="Describe the relationships between players, the environment, the type of questions you want to generate..."
          />
          <Btn class="w-full" theme="neon" type="submit">Save changes</Btn>
        </form>

        <DialogClose
          class="absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
          aria-label="Close"
        >
          <XMarkIcon class="w-6" />
        </DialogClose>
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
</template>
