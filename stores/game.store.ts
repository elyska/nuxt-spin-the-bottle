import { defineStore } from "pinia";

export const useGameStore = defineStore("docs", () => {
  const bottle = ref();

  return {
    bottle,
  };
});
