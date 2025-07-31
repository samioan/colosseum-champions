<script setup lang="ts">
defineProps<{
  label: string;
  stat: number;
  showLevelUp?: boolean;
  onClick?: () => void;
}>();
</script>

<template>
  <div class="flex items-center justify-between mb-1">
    <div class="flex gap-2 text-sm">
      <span class="font-medium text-gray-300">{{ label }}:</span>
      <span class="text-gray-100">{{ stat }}</span>
    </div>

    <button
      v-if="showLevelUp"
      @click="onClick"
      class="px-2 py-1 text-xs font-bold rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
    >
      +
    </button>
  </div>
</template>
