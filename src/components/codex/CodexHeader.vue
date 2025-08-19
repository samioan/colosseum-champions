<script setup lang="ts">
defineProps<{
  title: string;
}>();
</script>

<template>
  <div class="text-sm text-gray-300 p-4 flex justify-between">
    <span>{{ title }}</span>
    <span>+</span>
  </div>
</template>
