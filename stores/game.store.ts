import { defineStore } from "pinia";

export const useGameStore = defineStore("game", () => {
  const bottle = ref();
  const gameStarted = ref(false);
  const spinning = ref(false);
  const players = ref<string[]>([]);
  const player = ref("");
  const showDialog = ref(false);

  function setPlayer(angle: number) {
    const numNames = players.value.length;
    const degreePerName = 360 / numNames;
    const index = Math.floor(angle / degreePerName);
    player.value =  players.value[index];
  }

  return {
    bottle,
    gameStarted,
    players,
    player,
    spinning,
    showDialog,
    setPlayer,
  };
});
