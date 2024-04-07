<script setup lang="ts">
import anime from "animejs";
import { Vector3 } from "three";
import type { ShallowRef } from "vue";

const props = defineProps<{
  gameStarted: boolean;
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
const camera: ShallowRef<TresInstance | null> = shallowRef(null);

watch(
  () => props.gameStarted,
  () => {
    if (props.gameStarted) {
      anime({
        targets: camera.value?.position,
        x: -0.473,
        y: 0.504,
        z: -1.332,
        delay: 1000,
        duration: 3000,
        easing: "linear", // easing function
      });
    }
  }
);
</script>

<template>
  <TresCanvas clear-color="#82DBC5" window-size>
    <TresPerspectiveCamera ref="camera" :position="position" />
    <!-- <OrbitControls /> -->
    <OrbitControls
      :max-distance="3"
      :min-distance="1.5"
      :max-polar-angle="Math.PI / 2"
      :min-polar-angle="Math.PI / 4"
    />
    <Suspense>
      <GameKitchen @selected-bottle="handleSelectedBottle" />
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
