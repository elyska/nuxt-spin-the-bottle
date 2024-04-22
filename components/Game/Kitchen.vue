<script setup lang="ts">
import * as THREE from "three";
import { useEventListener } from "@vueuse/core";
import anime from "animejs";
import type { TresObject3D } from "@tresjs/core";

const store = useGameStore();

const { sizes, camera, raycaster } = useTresContext();

const { scene: model, nodes } = await useGLTF("/models/kitchen.gltf");

model.traverse((child: TresObject) => {
  if (child?.isMesh) {
    child.material.depthWrite = true;
  }
});

const bottleNames = ["Malibu", "Jack", "Becherovka", "Jameson"];

const bottles = bottleNames.map((name) => nodes[name]);

let animation = ref();
let previousSelection = ref();
const selectedBottle = ref();
const spotLight = shallowRef<THREE.Light>();

let initialPositionY: number;
function selectBottle(event: MouseEvent) {
  if (!camera.value || !store.gameStarted) {
    return;
  }
  const mouse = new THREE.Vector2();
  mouse.x = normaliseCursorPosition(event.clientX, sizes.width.value);
  mouse.y = -normaliseCursorPosition(event.clientY, sizes.height.value);

  raycaster.value.setFromCamera(mouse, camera.value);

  const modelIntersects = raycaster.value.intersectObjects(bottles);

  if (modelIntersects.length) {
    // update selection
    selectedBottle.value = modelIntersects[0].object;
    store.bottle = selectedBottle.value.name;

    // update spotlight position
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
        y: initialPositionY,
        easing: "easeOutQuad",
        duration: 150,
      });
    }

    // a new bottle was clicked
    if (previousSelection.value?.name !== selectedBottle.value.name) {
      initialPositionY = selectedBottle.value.position.y;
      animation.value = anime({
        targets: selectedBottle.value.position,
        y: initialPositionY + 0.05,
        duration: 1000,
        easing: "linear",
        direction: "alternate",
        loop: true,
      });
    }

    previousSelection.value = modelIntersects[0].object;
  }
}
useEventListener(document, "click", selectBottle);
</script>

<template>
  <TresSpotLight ref="spotLight" :args="[0xffffff, 0.5, 15, 3.6, 1, 2]" />
  <TresDirectionalLight :args="['#fce8bb', 2]" :position="[-5, 10, -5]" />
  <primitive v-if="model" :object="model" />
</template>

<style scoped></style>
