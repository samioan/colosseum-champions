<script setup lang="ts">
defineProps<{
  name: string;
  levelLabel: string;
}>();
</script>

<template>
  <div class="flex text-sm justify-between items-center gap-4">
    <span>
      {{ name }}
    </span>
    <span class="text-xs px-2 py-1 rounded-lg bg-cBgLight text-center">
      {{ levelLabel }}
    </span>
  </div>
</template>
