<script setup lang="ts"></script>

<template>
  <h1
    class="text-5xl lg:text-8xl text-center font-neon neon-text neon-animation mb-6"
  >
    <slot />
  </h1>
</template>

<style scoped>
/* https://css-tricks.com/how-to-create-neon-text-with-css/ */
.neon-text {
  color: #fff;
  text-shadow: 0 0 7px #fff, 0 0 10px #fff, 0 0 21px #fff,
    0 0 42px theme("colors.neon-pink.DEFAULT"),
    0 0 82px theme("colors.neon-pink.DEFAULT"),
    0 0 92px theme("colors.neon-pink.DEFAULT"),
    0 0 102px theme("colors.neon-pink.DEFAULT"),
    0 0 151px theme("colors.neon-pink.DEFAULT");
}

.neon-animation {
  animation: pulsate 0.11s ease-in-out infinite alternate;
}

@keyframes pulsate {
  100% {
    text-shadow: 0 0 4px #fff, 0 0 11px #fff, 0 0 19px #fff,
      0 0 40px theme("colors.neon-pink.DEFAULT"),
      0 0 80px theme("colors.neon-pink.DEFAULT"),
      0 0 90px theme("colors.neon-pink.DEFAULT"),
      0 0 100px theme("colors.neon-pink.DEFAULT"),
      0 0 150px theme("colors.neon-pink.DEFAULT");
  }

  0% {
    text-shadow: 0 0 4px #fff, 0 0 10px #fff, 0 0 18px #fff,
      0 0 38px theme("colors.neon-pink.DEFAULT"),
      0 0 73px theme("colors.neon-pink.DEFAULT"),
      0 0 80px theme("colors.neon-pink.DEFAULT"),
      0 0 94px theme("colors.neon-pink.DEFAULT"),
      0 0 140px theme("colors.neon-pink.DEFAULT");
  }
}
</style>
