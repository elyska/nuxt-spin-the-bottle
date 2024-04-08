<script setup lang="ts">
import * as THREE from "three";
import { useEventListener } from "@vueuse/core";
import anime from "animejs";

const store = useGameStore();

const { sizes, camera, raycaster } = useTresContext();

const { scene: model } = await useGLTF("/models/kitchen.glb");

model.traverse((child: TresObject) => {
  if (child?.isMesh) {
    child.material.depthWrite = true;
  }
});

const bottleNames = ["Malibu", "Jack", "Becherovka", "Jameson"];

const bottles = model.children.filter((child: TresObject) =>
  bottleNames.includes(child.name)
);
bottles.forEach((item: TresObject) => {
  item.initialRotationZ = item.rotation.z;
  item.initialPositionY = item.position.y;
});

let animation = ref();
let previousSelection = ref();
const selectedBottle = ref();
const spotLight = shallowRef<THREE.Light>();

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
useEventListener(document, "click", selectBottle);
</script>

<template>
  <TresSpotLight ref="spotLight" :args="[0xffffff, 0.5, 15, 3.6, 1, 2]" />
  <TresDirectionalLight
    ref="directionalLight"
    :args="['#fce8bb', 2]"
    :position="[-5, 10, -5]"
  />
  <primitive v-if="model" :object="model" />
</template>

<style scoped></style>
