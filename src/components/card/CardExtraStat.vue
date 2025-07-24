<script setup lang="ts">
defineProps<{
  label: string;
  stat: number;
  disabled?: boolean;
  onClick?: () => void;
}>();
</script>

<template>
  <div class="flex items-center justify-between mb-1">
    <div class="flex items-center gap-2">
      <span class="font-medium">{{ label }}</span>
      <span>{{ stat }}</span>
    </div>
    <button
      v-if="onClick"
      :disabled="disabled"
      @click="onClick"
      class="px-2 py-1 text-xs font-bold rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
    >
      +
    </button>
  </div>
</template>
