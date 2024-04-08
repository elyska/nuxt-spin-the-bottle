<script lang="ts" setup>
const props = defineProps<{
  players?: string[];
}>();

const strokeWidth = 30;
const r = 100 - strokeWidth / 2;
const circumference = 2 * Math.PI * r;

const segments = computed(() => props.players?.length ?? 0);
const segmentAngle = computed(() =>
  props.players?.length && props.players.length > 0
    ? 360 / props.players.length
    : 0
);

const gap = 1;
</script>

<template>
  <div class="relative">
    <svg
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
      class="w-full"
    >
      <circle
        cx="100"
        cy="100"
        :r="r"
        fill="none"
        class="stroke-tres-blue/[0.7]"
        :stroke-width="strokeWidth"
        :stroke-dasharray="`${circumference / segments - gap} ${gap}`"
      />
    </svg>
    <div
      v-for="(player, i) in players"
      class="absolute inset-[5%] text-center text-white font-bangers text-2xl"
      :style="`rotate: ${90 + segmentAngle / 2 + i * segmentAngle}deg`"
    >
      {{ player }}
    </div>
  </div>
</template>

<style scoped></style>
