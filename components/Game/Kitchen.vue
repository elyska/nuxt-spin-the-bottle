<script setup lang="ts">
import * as THREE from "three";
import {
  Object3D,
  type Vector3,
  type Object3DEventMap,
} from "three/src/Three.js";
import { useEventListener } from "@vueuse/core";
import anime from "animejs";

const emit = defineEmits<{
  (e: "selected-bottle", bottle: string): void;
}>();

const { sizes, camera, raycaster } = useTresContext();

const { scene: model } = await useGLTF("/models/kitchen.glb");

console.log(model);

model.traverse((child: any) => {
  if (child?.isMesh) {
    child.material.depthWrite = true;
  }
});

const table = model.getObjectByName("table");
table?.traverse((child: any) => {
  if (child.isMesh) {
    // show shadows on the table
    child.receiveShadow = true;
  }
});

const bottleNames = ["Malibu", "Jack", "Becherovka", "Jameson"];

const bottles = model.children.filter((child: any) =>
  bottleNames.includes(child.name)
);
bottles.forEach((item: Object3D<Object3DEventMap>) => {
  item.castShadow = true;

  item.initialRotationZ = item.rotation.z;
  item.initialPositionY = item.position.y;
});

let animation: any;
let previousSelection = ref();
const selectedBottle = ref();
useEventListener(document, "click", (event) => {
  if (!camera.value) {
    return;
  }
  const mouse = new THREE.Vector2();
  mouse.x = normaliseCursorPosition(event.clientX, sizes.width.value);
  mouse.y = -normaliseCursorPosition(event.clientY, sizes.height.value);

  raycaster.value.setFromCamera(mouse, camera.value);

  const modelIntersects = raycaster.value.intersectObjects(bottles);

  if (modelIntersects.length) {
    selectedBottle.value = modelIntersects[0].object;
    emit("selected-bottle", selectedBottle.value.name);

    // a new bottle clicked and another bottle was clicked previously
    if (
      animation &&
      previousSelection.value?.name !== selectedBottle.value?.name
    ) {
      animation.pause();
      anime({
        targets: previousSelection.value.position,
        y: previousSelection.value.initialPositionY,
        easing: "easeOutQuad",
        duration: 150,
      });
    }

    // a new bottle was clicked
    if (previousSelection.value?.name !== selectedBottle.value.name) {
      animation = anime({
        targets: selectedBottle.value.position,
        y: selectedBottle.value.initialPositionY + 0.05,
        duration: 1000,
        easing: "linear",
        direction: "alternate",
        loop: true,
      });
    }

    previousSelection.value = modelIntersects[0].object;
  }
});
</script>

<template>
  <primitive v-if="model" :object="model" />
</template>

<style scoped></style>
