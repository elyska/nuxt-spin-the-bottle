<script setup lang="ts">
const controlsMinDistance = ref(1.5);
const controlsMinPolarAngle = ref(Math.PI / 4);
</script>

<template>
  <TresCanvas window-size>
    <TresPerspectiveCamera :position="[0, 3, -2.3]" />

    <OrbitControls
      ref="controls"
      :max-distance="3"
      :min-distance="controlsMinDistance"
      :max-polar-angle="Math.PI / 2"
      :min-polar-angle="controlsMinPolarAngle"
    />

    <Suspense>
      <GameKitchen />
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
