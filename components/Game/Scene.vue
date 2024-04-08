<script setup lang="ts">
import type { TresCamera } from "@tresjs/core";
import anime from "animejs";
import { Light, Vector3 } from "three";

const store = useGameStore();

const position = new Vector3(0, 3, -2.3);
const ambientLight = shallowRef<Light>();
const camera = shallowRef<TresCamera>();
// const controlsEnabled = ref(false);
const controlsMinDistance = ref(1.5);
const controlsMinPolarAngle = ref(Math.PI / 4);

watch(
  () => store.gameStarted,
  () => {
    if (store.gameStarted) {
      if (ambientLight.value) ambientLight.value.intensity = 0.45;
      // anime({
      //   targets: camera.value?.position,
      //   x: -0.473,
      //   y: 0.504,
      //   z: -1.332,
      //   delay: 1000,
      //   duration: 5000,
      //   frameRate: 6,
      //   easing: "linear",
      //   complete: function () {
      //     controlsEnabled.value = true;
      //   },
      // });
    }
  }
);
</script>

<template>
  <TresCanvas window-size>
    <TresPerspectiveCamera ref="camera" :position="position" />

    <OrbitControls
      ref="controls"
      :max-distance="3"
      :min-distance="controlsMinDistance"
      :max-polar-angle="Math.PI / 2"
      :min-polar-angle="controlsMinPolarAngle"
      :damping-factor="0.2"
    />

    <Suspense>
      <GameKitchen />
    </Suspense>

    <TresAmbientLight ref="ambientLight" :intensity="1" />
  </TresCanvas>
</template>

<style>
#app {
  height: 100%;
  width: 100%;
  z-index: 0;
}
</style>
