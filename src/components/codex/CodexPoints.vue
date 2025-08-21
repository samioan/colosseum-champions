<script setup lang="ts">
import { LABELS } from "@/constants";
</script>

<template>
  <div
    class="w-full p-4 bg-cBgDark flex items-center justify-between gap-2 border-b-2 border-gray-500"
  >
    <span class="font-medium">{{ LABELS.points }}</span>
    <slot />
  </div>
</template>
