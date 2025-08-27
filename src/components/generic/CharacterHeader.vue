<script setup lang="ts">
import { LABELS } from "@/constants";

defineProps<{
  name: string;
  level: number;
}>();
</script>

<template>
  <div class="flex text-sm justify-between items-center gap-4">
    <span>
      {{ name }}
    </span>
    <span class="text-xs px-2 py-1 rounded-lg bg-cBgLight text-center">
      {{ LABELS.level }} {{ level }}
    </span>
  </div>
</template>
