<script setup lang="ts">
import { CodexPoints } from "@/components";

defineProps<{
  points: number;
  stats: {
    label: string;
    stat: number;
    onClick?: () => void;
  }[];
}>();
</script>

<template>
  <div class="flex-1 text-sm text-gray-300 p-4 border-b-2 border-yellow-400">
    <CodexPoints>{{ points }}</CodexPoints>

    <div v-for="statObj in stats">
      <div
        class="flex items-center justify-between mb-2 h-[24px]"
        :class="points ? '' : 'pointer-events-none'"
        @click="statObj.onClick"
      >
        <div class="flex gap-2 text-sm">
          <span class="font-medium text-gray-300">{{ statObj.label }}:</span>
          <span class="text-gray-100">{{ statObj.stat }}</span>
        </div>

        <button
          v-if="points"
          class="px-2 py-1 text-xs font-bold rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          +
        </button>
      </div>
    </div>
  </div>
</template>
