<script setup lang="ts">
import * as THREE from "three";
import { Object3D, type Object3DEventMap } from "three/src/Three.js";
import { useEventListener } from "@vueuse/core";
import anime from "animejs";
import type { ShallowRef } from "vue";

const props = defineProps<{
  play: boolean;
}>();

const emit = defineEmits<{
  (e: "selected-bottle", bottle: Object3D): void;
}>();

const { sizes, camera, raycaster } = useTresContext();

const { scene: model } = await useGLTF("/models/kitchen.glb");

console.log(model);

model.traverse((child: any) => {
  if (child?.isMesh) {
    child.material.depthWrite = true;
  }
});

const bottleNames = ["Malibu", "Jack", "Becherovka", "Jameson"];

const bottles = model.children.filter((child: any) =>
  bottleNames.includes(child.name)
);
bottles.forEach((item: any) => {
  item.initialRotationZ = item.rotation.z;
  item.initialPositionY = item.position.y;
});

let animation = ref();
let previousSelection = ref();
const selectedBottle = ref();
const spotLight: ShallowRef<TresInstance | null> = shallowRef(null);

function selectBottle(event: MouseEvent) {
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
    emit("selected-bottle", selectedBottle.value);

    // Update spotlight position
    if (spotLight.value?.position) {
      spotLight.value.position.copy(selectedBottle.value.position);
    }

    // a new bottle clicked and another bottle was clicked previously
    if (
      animation.value &&
      previousSelection.value?.name !== selectedBottle.value?.name
    ) {
      animation.value.pause();
      anime({
        targets: previousSelection.value.position,
        y: previousSelection.value.initialPositionY,
        easing: "easeOutQuad",
        duration: 150,
      });
    }

    // a new bottle was clicked
    if (previousSelection.value?.name !== selectedBottle.value.name) {
      animation.value = anime({
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
}
const stop = useEventListener(document, "click", selectBottle);
watch(
  () => props.play,
  () => {
    if (props.play) {
      // disable selecting bottle, remove highlighting of selected bottle
      // document.removeEventListener("click", selectBottle);
      stop();
      animation.value.pause();

      // remove other bottles
      bottles.forEach((bottle: Object3D) => {
        if (bottle.name !== selectedBottle.value.name) {
          model.remove(bottle);
        }
      });
    }
  }
);
</script>

<template>
  <TresSpotLight
    v-if="!play"
    ref="spotLight"
    :args="[0xffffff, 0.5, 15, 3.6, 1, 2]"
  />
  <TresDirectionalLight
    ref="directionalLight"
    :args="['#fce8bb', 2]"
    :position="[-5, 10, -5]"
  />
  <primitive v-if="model" :object="model" />
</template>

<style scoped></style>
