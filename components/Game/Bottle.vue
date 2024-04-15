<script setup lang="ts">
import anime from "animejs";
import { usePointerSwipe, type UseSwipeDirection } from "@vueuse/core";
import type { BottleName } from "~/types/bottles.types";

const props = defineProps<{
  bottle: BottleName;
}>();

const store = useGameStore();

const { sizes } = useTresContext();

const { scene: model } = await useGLTF(`/models/${props.bottle}.gltf`);
model.traverse((child: TresObject) => {
  if (child.isMesh) {
    child.castShadow = true;
  }
});

const cursor = ref({ x: 0, y: 0 });

function handleSwipe(event: PointerEvent, direction: UseSwipeDirection) {
  const velocity = 0.5 + Math.random();
  cursor.value.x = normaliseCursorPosition(event.x, sizes.width.value);
  cursor.value.y = normaliseCursorPosition(event.y, sizes.height.value);

  const angleDirection = getAngleDirection(cursor.value, direction);

  if (!store.spinning) {
    model.rotation.y = normaliseAngle(model.rotation.y);
    anime({
      targets: model.rotation,
      y: model.rotation.y + Math.PI * 4 * angleDirection * velocity,
      duration: 4000,
      easing: "easeOutQuint",
      frameRate: 24,
      begin: function () {
        store.spinning = true;
      },
      complete: function () {
        store.spinning = false;
        const angle =
          normaliseAngle(2 * Math.PI - model.rotation.y - Math.PI / 2) *
          (180 / Math.PI);
        // console.log(angle);
        store.setPlayer(angle);
        // console.log(store.player);
        store.showDialog = true;
      },
    });
  }
}

const bodyElement = ref(document.body);
usePointerSwipe(bodyElement, { onSwipeEnd: handleSwipe });
</script>

<template>
  <primitive v-if="model" :object="model" cast-shadow />
</template>

<style scoped></style>
