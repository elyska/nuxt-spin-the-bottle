<script setup lang="ts">
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

const path = "/models/kitchen.glb";
// const { scene } = await useLoader(GLTFLoader, path);
// const path = 'https://raw.githubusercontent.com/Tresjs/assets/main/models/gltf/blender-cube.glb'
// const { scene } = await useGLTF(path)
</script>

<template>
  <TresCanvas clear-color="#82DBC5" window-size>
    <TresPerspectiveCamera :position="[0, 3, -2.3]" :look-at="[0, 0, 0]" />
    <OrbitControls
      :max-distance="3"
      :min-distance="1.5"
      :max-polar-angle="Math.PI / 2"
      :min-polar-angle="Math.PI / 4"
    />
    <Suspense>
      <GLTFModel :path="path" />
    </Suspense>
    <TresAmbientLight :intensity="1" />
  </TresCanvas>
</template>

<style>
#app {
  height: 100%;
  width: 100%;
  z-index: 0;
}
</style>
