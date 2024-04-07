<script setup lang="ts">
import * as THREE from "three";
import {
  Object3D,
  type Vector3,
  type Object3DEventMap,
} from "three/src/Three.js";
import { useEventListener } from "@vueuse/core";

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
});

const emit = defineEmits<{
  (e: "selected-bottle", bottle: string): void;
}>();

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
    selectedBottle.value = modelIntersects[0].object.name;
    emit("selected-bottle", selectedBottle.value);
  }
  console.log(selectedBottle.value);
});
</script>

<template>
  <primitive v-if="model" :object="model" />
</template>

<style scoped></style>
