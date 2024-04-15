import { defineStore } from "pinia";

export const useQuestionsStore = defineStore("questions", () => {
  //   const truths = ref(data.truth);
  //   const dares = ref(data.dare);
  const truths = ref(shuffleArray(data.truth));
  const dares = ref(shuffleArray(data.dare));
  const aiContext = ref<
    {
      role: "user" | "assistant";
      content: string;
    }[]
  >([]);

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
      const res = await $fetch("/api/generate", {
        method: "POST",
        body: { type, context: aiContext.value },
      });

      if (res.content.length > 0) {
        const question = res.content[0].text;

        aiContext.value = [
          ...aiContext.value,
          {
            role: "user",
            content: type,
          },
          {
            role: "assistant",
            content: question,
          },
        ];

        return "AI: " + question;
      }
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
