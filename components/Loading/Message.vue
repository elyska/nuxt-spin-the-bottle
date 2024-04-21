<script setup lang="ts">
withDefaults(
  defineProps<{
    colour: "white" | "black";
  }>(),
  {
    colour: "black",
  }
);
</script>

<template>
  <div class="ml-2 loader" :class="colour"></div>
</template>

<style scoped>
.loader {
  scale: 0.5;
  width: 15px;
  aspect-ratio: 1;
  border-radius: 50%;
}
.white {
  animation: white 1s infinite linear alternate;
}
.black {
  animation: black 1s infinite linear alternate;
}
@keyframes white {
  0% {
    box-shadow: 20px 0 #fff, -20px 0 #fff2;
    background: #fff;
  }
  33% {
    box-shadow: 20px 0 #fff, -20px 0 #fff2;
    background: #fff2;
  }
  66% {
    box-shadow: 20px 0 #fff2, -20px 0 #fff;
    background: #fff2;
  }
  100% {
    box-shadow: 20px 0 #fff2, -20px 0 #fff;
    background: #fff;
  }
}
@keyframes black {
  0% {
    box-shadow: 20px 0 #000, -20px 0 #0002;
    background: #000;
  }
  33% {
    box-shadow: 20px 0 #000, -20px 0 #0002;
    background: #0002;
  }
  66% {
    box-shadow: 20px 0 #0002, -20px 0 #000;
    background: #0002;
  }
  100% {
    box-shadow: 20px 0 #0002, -20px 0 #000;
    background: #000;
  }
}
</style>
