<script setup lang="ts">
import { Button } from "@/components";
import { LABELS, COLORS } from "@/constants";

defineProps<{
  gold: number;
  items: {
    label: string;
    description: string;
    gold: number;
    onBuy: () => void;
    amount: number;
  }[];
}>();
</script>

<template>
  <div class="flex-1 text-sm text-gray-300 p-4 border-b-2 border-yellow-400">
    <div
      class="flex items-center justify-between gap-2 pb-4 mb-4 border-b-2 border-gray-400"
    >
      <span class="font-medium">{{ LABELS.GOLD }}</span>
      {{ gold }}
    </div>
    <div
      v-for="item in items"
      class="flex flex-col items-center justify-center gap-2 p-4 rounded-lg"
      :class="{
        'bg-stone-600': item.amount,
        'bg-stone-800': !item.amount,
        'mb-4': items.indexOf(item) < items.length - 1,
      }"
    >
      <div class="text-lg font-bold text-white">
        {{ item.label }}
      </div>
      <div class="text-sm text-gray-400 text-center">
        {{ item.description }}
      </div>
      <div class="text-sm text-gray-400 text-center">
        {{ item.amount }}
      </div>
      <div class="flex justify-center gap-4">
        <Button
          label="Buy"
          :disabled="gold < item.gold"
          :on-click="item.onBuy"
          :color-classes="COLORS.STATS_BUTTON"
        />
      </div>
    </div>
  </div>
</template>
