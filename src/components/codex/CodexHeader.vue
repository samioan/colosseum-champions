<script setup lang="ts">
defineProps<{
  title: string;
}>();
</script>

<template>
  <div
    class="text-sm text-gray-300 p-4 border-b-2 border-yellow-400 flex justify-between"
  >
    <span>{{ title }}</span>
    <span>+</span>
  </div>
</template>
