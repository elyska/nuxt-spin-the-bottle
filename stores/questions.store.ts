import { defineStore } from "pinia";
type Context = {
  role: "user" | "assistant";
  content: string;
}[];

export const useQuestionsStore = defineStore("questions", () => {
  const gameStore = useGameStore();
  const truths = ref(shuffleArray(data.truth));
  const dares = ref(shuffleArray(data.dare));
  const aiContext = ref<Context>([]);
  const prompt = ref();
  const generateByAI = ref(true);

  const truthIndex = ref(0);
  const dareIndex = ref(0);

  async function testPrompt(
    prompt: string,
    player: string,
    type: "truth" | "dare"
  ) {
    const context: Context = [
      {
        role: "user",
        content: `${player} ${type}`,
      },
    ];

    const res = await $fetch("/api/generate", {
      method: "POST",
      body: { context, players: gameStore.players, prompt },
    });

    const question = res.content[0].text;

    return question;
  }

  function getTruth() {
    const truth = truths.value[truthIndex.value];
    truthIndex.value++;
    return truth;
  }

  function getDare() {
    const dare = dares.value[dareIndex.value];
    dareIndex.value++;
    return dare;
  }

  function getQuestionFromDataBank(type: "truth" | "dare") {
    switch (type) {
      case "truth":
        return getTruth();
      case "dare":
        return getDare();
    }
  }

  async function getQuestion(type: "truth" | "dare") {
    if (!generateByAI.value) {
      return getQuestionFromDataBank(type);
    }
    try {
      const context: Context = [
        ...aiContext.value,
        {
          role: "user",
          content: `${gameStore.player} ${type}`,
        },
      ];

      const res = await $fetch("/api/generate", {
        method: "POST",
        body: { context, players: gameStore.players, prompt: prompt.value },
      });

      const question = res.content[0].text;

      aiContext.value = [
        ...context,
        {
          role: "assistant",
          content: question,
        },
      ];

      return question;
    } catch {
      return getQuestionFromDataBank(type);
    }
  }

  return {
    getQuestion,
    getQuestionFromDataBank,
    testPrompt,
    prompt,
    generateByAI,
  };
});
