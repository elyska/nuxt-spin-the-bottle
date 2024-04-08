<script setup lang="ts">
import anime from "animejs";
import { usePointerSwipe, type UseSwipeDirection } from "@vueuse/core";
import type { BottleName } from "~/types/bottles.types";

const props = defineProps<{
  bottle: BottleName;
}>();

const { sizes } = useTresContext();

const { scene: model } = await useGLTF(`/models/bottles/${props.bottle}.glb`);
model.traverse((child: TresObject) => {
  if (child.isMesh) {
    child.castShadow = true;
  }
});

const cursor = ref({ x: 0, y: 0 });
let spinning = ref(false);
function handleSwipe(event: PointerEvent, direction: UseSwipeDirection) {
  const velocity = 0.5 + Math.random();
  cursor.value.x = normaliseCursorPosition(event.x, sizes.width.value);
  cursor.value.y = normaliseCursorPosition(event.y, sizes.height.value);

  const angleDirection = getAngleDirection(cursor.value, direction);

  if (!spinning.value) {
    model.rotation.y = normaliseAngle(model.rotation.y);
    anime({
      targets: model.rotation,
      y: model.rotation.y + Math.PI * 4 * angleDirection * velocity,
      duration: 4000,
      easing: "easeOutQuint",
      begin: function () {
        spinning.value = true;
      },
      complete: function () {
        spinning.value = false;
        console.log(normaliseAngle(model.rotation.y) * (180 / Math.PI));
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
