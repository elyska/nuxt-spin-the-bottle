<script setup lang="ts">
import anime from "animejs";
import { usePointerSwipe } from "@vueuse/core";

const { sizes, scene } = useTresContext();

const { scene: model } = await useGLTF("/models/bottles_glb/jack.glb");
model.rotation.y = Math.PI;
model.traverse((child: any) => {
  if (child.isMesh) {
    child.castShadow = true;
  }
});

const cursor = ref({ x: 0, y: 0 });
let spinning = ref(false);
function handleSwipe(event, direction) {
  const velocity = Math.abs(event.overallVelocity);

  cursor.value.x = normaliseCursorPosition(event.center.x, sizes.width.value);
  cursor.value.y = normaliseCursorPosition(event.center.y, sizes.height.value);

  const angleDirection = getAngleDirection(cursor, direction);

  if (!spinning.value) {
    model.rotation.y = normaliseAngle(model.rotation.y);
    anime({
      targets: model.rotation,
      y: model.rotation.y - Math.PI * 4 * angleDirection * velocity,
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
const { isSwiping, direction } = usePointerSwipe(bodyElement, { onSwipeEnd: end });
function end(e: PointerEvent, d: string) {
  console.log("end", e, d);
}
</script>

<template>
  <primitive v-if="model" :object="model" cast-shadow />
</template>

<style scoped></style>
