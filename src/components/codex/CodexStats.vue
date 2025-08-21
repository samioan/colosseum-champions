<script setup lang="ts">
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
  <div class="text-xs text-gray-300">
    <div v-for="statObj in stats">
      <div
        class="flex items-center justify-between pb-1"
        :class="points ? '' : 'pointer-events-none'"
        @click="statObj.onClick"
      >
        <div class="flex gap-2 text-xs">
          <span class="font-medium text-gray-300">{{ statObj.label }}:</span>
          <span class="text-gray-100">{{ statObj.stat }}</span>
        </div>

        <button
          v-if="points"
          class="px-2 py-1 text-xs font-bold rounded-full bg-cBlue text-white disabled:opacity-50"
        >
          +
        </button>
      </div>
    </div>
  </div>
</template>
