<script setup lang="ts">
import { CardExtraStat } from "@/components";

defineProps<{
  points?: number;
  extraStats: {
    label: string;
    stat: number;
    disabled?: boolean;
    onClick?: () => void;
  }[];
}>();
</script>

<template>
  <div
    class="flex-1 border-l border-gray-300 dark:border-gray-700 pl-4 text-sm text-gray-700 dark:text-gray-300"
  >
    <div class="flex justify-between items-center mb-2">
      <h3 class="font-semibold">📊 Stats</h3>
      <div class="flex items-center gap-2" v-if="points">
        <span class="font-medium">⬆️</span>
        <span>{{ points }}</span>
      </div>
    </div>
    <CardExtraStat v-for="stat in extraStats" v-bind="stat" />
  </div>
</template>
