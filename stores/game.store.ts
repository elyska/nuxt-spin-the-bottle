import { defineStore } from "pinia";

export const useGameStore = defineStore("docs", () => {
  const bottle = ref();
  const gameStarted = ref(false);

  return {
    bottle,
    gameStarted,
  };
});
