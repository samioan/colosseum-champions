<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  label: string;
  stat: number;
  maxStat?: number;
  colorClass?: string;
}>();

const statPercent = computed(() =>
  props.maxStat ? Math.min(100, (props.stat / props.maxStat) * 100) : props.stat
);
</script>

<template>
  <div class="relative w-full border border-cBgLight rounded-lg">
    <div v-if="maxStat" class="w-full h-6 bg-cBgDarker rounded-lg">
      <div
        class="h-6 rounded-lg transition-all duration-300"
        :class="colorClass"
        :style="{ width: statPercent + '%' }"
      ></div>
    </div>

    <div class="absolute inset-0 flex items-center justify-center text-sm">
      <span class="drop-shadow">
        {{ stat }}{{ maxStat ? " / " + maxStat : "" }}
      </span>
    </div>
  </div>
</template>
