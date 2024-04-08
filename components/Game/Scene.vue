<script setup lang="ts">
import anime from "animejs";
import * as THREE from "three";
import { Object3D, Vector3 } from "three";
import type { ShallowRef } from "vue";

const props = defineProps<{
  gameStarted: boolean;
  play: boolean;
}>();

const emit = defineEmits<{
  (e: "selected"): void;
}>();

const selectedBottle = ref();

function handleSelectedBottle(data: string) {
  selectedBottle.value = data;
  console.log(data);
  emit("selected");
}

const position = new Vector3(0, 3, -2.3);
const ambientLight: ShallowRef<TresInstance | null> = shallowRef(null);
const camera: ShallowRef<TresInstance | null> = shallowRef(null);
const controlsEnabled = ref(false);
const controlsMinDistance = ref(1.5);
const controlsMinPolarAngle = ref(Math.PI / 4);
watch(
  () => props.gameStarted,
  () => {
    if (props.gameStarted) {
      ambientLight.value.intensity = 0.45;
      anime({
        targets: camera.value?.position,
        x: -0.473,
        y: 0.504,
        z: -1.332,
        delay: 1000,
        duration: 4000,
        easing: "linear",
        complete: function () {
          controlsEnabled.value = true;
        },
      });
    }
  }
);
watch(
  () => props.play,
  () => {
    if (props.play) {
      // disable controls and look at tabletop
      controlsMinDistance.value = 0;
      controlsMinPolarAngle.value = 0;
      controlsEnabled.value = false;

      camera.value.position.x = -0.0079;
      camera.value.position.y = 0.859;
      camera.value.position.z = 0.0000275;

      // position selected bottle
      selectedBottle.value.position.x = 0;
      selectedBottle.value.position.z = 0;
      selectedBottle.value.rotation.z =
        selectedBottle.value.initialRotationZ + Math.PI / 2;
      selectedBottle.value.rotation.x = -Math.PI;
      selectedBottle.value.rotation.y = Math.PI / 2;

      const boundingBox = new THREE.Box3().setFromObject(selectedBottle.value);
      const height = boundingBox.max.y - boundingBox.min.y;
      selectedBottle.value.position.y = height / 2;
    }
  }
);
</script>

<template>
  <TresCanvas clear-color="#82DBC5" window-size>
    <TresPerspectiveCamera ref="camera" :position="position" />
    <!-- <OrbitControls /> -->
    <OrbitControls
      ref="controls"
      :max-distance="3"
      :min-distance="controlsMinDistance"
      :max-polar-angle="Math.PI / 2"
      :min-polar-angle="controlsMinPolarAngle"
      :enabled="controlsEnabled"
    />

    <Suspense>
      <GameKitchen :play="play" @selected-bottle="handleSelectedBottle" />
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
