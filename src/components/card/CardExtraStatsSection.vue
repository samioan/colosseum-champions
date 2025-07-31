<script setup lang="ts">
import { CardExtraStat } from "@/components";

defineProps<{
  points?: number;
  extraStats: {
    label: string;
    stat: number;
    disabled?: boolean;
    onClick?: () => void;
  }[];
}>();
</script>

<template>
  <div class="flex-1 text-sm text-gray-300">
    <div class="flex items-center gap-2 mb-1">
      <span class="font-medium">POINTS: </span>
      <span>{{ points }}</span>
    </div>

    <CardExtraStat v-for="stat in extraStats" v-bind="stat" />
  </div>
</template>
