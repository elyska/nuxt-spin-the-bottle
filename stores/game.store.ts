import { defineStore } from "pinia";

export const useGameStore = defineStore("docs", () => {
  const bottle = ref();
  const gameStarted = ref(false);
  const spinning = ref(false);
  const players = ref<string[]>([]);

  return {
    bottle,
    gameStarted,
    players,
    spinning,
  };
});
