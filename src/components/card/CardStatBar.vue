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
  <div>
    <div class="flex gap-4 text-sm">
      <span class="font-medium text-gray-300">{{ label }}:</span>
      <span class="text-gray-100"
        >{{ stat }} {{ maxStat ? "/" : "" }} {{ maxStat }}</span
      >
    </div>
    <div
      class="w-full h-2 bg-gray-700 rounded-full overflow-hidden mt-1"
      v-if="maxStat"
    >
      <div
        class="h-2 rounded-full transition-all duration-300"
        :class="colorClass"
        :style="{ width: statPercent + '%' }"
      ></div>
    </div>
  </div>
</template>
