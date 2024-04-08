<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    prop: string;
  }>(),
  {
    prop: "example",
  }
);
</script>

<template>
  <TresCanvas clear-color="#82DBC5" window-size shadows>
    <TresPerspectiveCamera :position="[0, 1.2, 0]" :look-at="[0, 0, 0]" />
    <!-- <OrbitControls /> -->

    <Suspense>
      <GameTable />
    </Suspense>
    <Suspense>
      <GameBottle />
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
