<script setup lang="ts">
import { LABELS } from "@/constants";
import type { CardHeaderProps } from "@/types";

defineProps<CardHeaderProps>();
</script>

<template>
  <div class="flex justify-between items-center gap-4">
    <h2 class="text-sm font-bold text-gray-100">
      {{ name }}
    </h2>
    <span
      class="text-xs px-2 py-1 rounded-full bg-yellow-900 text-yellow-200 font-semibold whitespace-nowrap"
    >
      {{ LABELS.level }} {{ level }}
    </span>
  </div>
</template>
