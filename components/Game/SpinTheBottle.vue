<script setup lang="ts">
const { bottle } = useGameStore();
</script>

<template>
  <TresCanvas clear-color="#82DBC5" window-size shadows>
    <TresPerspectiveCamera :position="[0, 1.2, 0]" :look-at="[0, 0, 0]" />

    <Suspense>
      <GameTable />
    </Suspense>
    <Suspense>
      <GameBottle v-if="bottle" :bottle="bottle" />
    </Suspense>

    <TresAmbientLight :intensity="2.5" />
    <TresDirectionalLight
      :intensity="1.5"
      :position="[5, 20, 5]"
      cast-shadow
      :shadow-mapSize-width="4096"
      :shadow-mapSize-height="4096"
      :shadow-radius="1.1"
    />
  </TresCanvas>
</template>

<style scoped></style>
