<script setup lang="ts">
const selectedBottle = ref();
</script>

<template>
  <TresCanvas clear-color="#82DBC5" window-size>
    <TresPerspectiveCamera :position="[0, 3, -2.3]" />
    <!-- <OrbitControls /> -->
    <OrbitControls
      :max-distance="3"
      :min-distance="1.5"
      :max-polar-angle="Math.PI / 2"
      :min-polar-angle="Math.PI / 4"
    />
    <Suspense>
      <GameKitchen @selected-bottle="selectedBottle = $emit" />
    </Suspense>
    <TresAmbientLight :intensity="1" />
  </TresCanvas>
</template>

<style>
#app {
  height: 100%;
  width: 100%;
  z-index: 0;
}
</style>
