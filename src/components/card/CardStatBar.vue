<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  label: string;
  stat: number;
  maxStat: number;
  colorClass: string;
}>();

const statPercent = computed(() =>
  Math.min(100, (props.stat / props.maxStat) * 100)
);
</script>

<template>
  <div>
    <div class="flex justify-between text-sm text-gray-700 dark:text-gray-300">
      <span class="font-medium">{{ label }}</span>
      <span>{{ stat }} / {{ maxStat }}</span>
    </div>
    <div
      class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden mt-1"
    >
      <div
        class="h-2 rounded-full transition-all duration-300"
        :class="colorClass"
        :style="{ width: statPercent + '%' }"
      ></div>
    </div>
  </div>
</template>
