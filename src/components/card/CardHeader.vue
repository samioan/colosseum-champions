<script setup lang="ts">
defineProps<{
  name: string;
  level: number;
}>();
</script>

<template>
  <div class="flex justify-between items-center">
    <h2
      class="text-lg font-bold text-gray-800 dark:text-gray-100 tracking-wide"
    >
      {{ name }}
    </h2>
    <span
      class="text-xs px-2 py-1 rounded-full bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200 font-semibold"
    >
      Lv. {{ level }}
    </span>
  </div>
</template>
