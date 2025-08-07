<script setup lang="ts">
import { LABELS } from "@/constants";
</script>

<template>
  <div
    class="flex items-center justify-between gap-2 pb-4 mb-4 border-b-2 border-gray-400"
  >
    <span class="font-medium">{{ LABELS.points }}</span>
    <slot />
  </div>
</template>
