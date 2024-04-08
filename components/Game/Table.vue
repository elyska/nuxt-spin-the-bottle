<script setup lang="ts">
import type { TresObject } from '@tresjs/core';

const { scene: model } = await useGLTF("/models/table.glb");
model.rotation.y = Math.PI / 2;

model.traverse((child: TresObject) => {
  if (child.isMesh) {
    console.log(child);
    child.receiveShadow = true;
  }
});
</script>

<template>
  <primitive v-if="model" :object="model" />
</template>

<style scoped></style>
