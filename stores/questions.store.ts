import { defineStore } from "pinia";

export const useQuestionsStore = defineStore("questions", () => {
//   const truths = ref(data.truth);
//   const dares = ref(data.dare);
    const truths = ref(shuffleArray(data.truth));
    const dares = ref(shuffleArray(data.dare));

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
  return { getTruth, getDare };
});
