<script setup lang="ts"></script>

<template>
  <h1
    class="text-5xl lg:text-8xl text-center font-neon neon-text neon-animation"
  >
    <slot />
  </h1>
</template>

<style scoped>
/* https://css-tricks.com/how-to-create-neon-text-with-css/ */
.neon-text {
  color: #fff;
  text-shadow: 0 0 7px #fff, 0 0 10px #fff, 0 0 21px #fff, 0 0 42px #ff0099,
    0 0 82px #ff0099, 0 0 92px #ff0099, 0 0 102px #ff0099, 0 0 151px #ff0099;
}

.neon-animation {
  animation: pulsate 0.11s ease-in-out infinite alternate;
}

@keyframes pulsate {
  100% {
    text-shadow: 0 0 4px #fff, 0 0 11px #fff, 0 0 19px #fff, 0 0 40px #ff0099,
      0 0 80px #ff0099, 0 0 90px #ff0099, 0 0 100px #ff0099, 0 0 150px #ff0099;
  }

  0% {
    text-shadow: 0 0 4px #fff, 0 0 10px #fff, 0 0 18px #fff, 0 0 38px #ff0099,
      0 0 73px #ff0099, 0 0 80px #ff0099, 0 0 94px #ff0099, 0 0 140px #ff0099;
  }
}
</style>
