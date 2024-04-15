import { defineStore } from "pinia";
type Context = {
  role: "user" | "assistant";
  content: string;
}[];

export const useQuestionsStore = defineStore("questions", () => {
  const truths = ref(shuffleArray(data.truth));
  const dares = ref(shuffleArray(data.dare));
  const aiContext = ref<Context>([]);

  const truthIndex = ref(0);
  const dareIndex = ref(0);

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

  async function getQuestion(type: "truth" | "dare") {
    try {
      const context: Context = [
        ...aiContext.value,
        {
          role: "user",
          content: type,
        },
      ];

      const res = await $fetch("/api/generate", {
        method: "POST",
        body: { context },
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
      switch (type) {
        case "truth":
          return getTruth();
        case "dare":
          return getDare();
      }
    }
  }

  return { getQuestion };
});
