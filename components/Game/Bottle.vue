<script setup lang="ts">
const { scene: model } = await useGLTF("/models/bottles_glb/jack.glb");
model.rotation.y = Math.PI;
model.traverse((child: any) => {
  if (child.isMesh) {
    console.log(child);
    child.castShadow = true;
  }
});
</script>

<template>
  <primitive v-if="model" :object="model" cast-shadow />
</template>

<style scoped></style>
