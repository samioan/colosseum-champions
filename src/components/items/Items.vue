<script setup lang="ts">
defineProps<{
  gold: number;
  items: {
    image: string;
    label: string;
    description: string;
    gold: number;
    onBuy: () => void;
    amount: number;
  }[];
}>();
</script>

<template>
  <div class="p-4">
    <div
      v-for="item in items"
      class="p-4 rounded-xl"
      :class="{
        'bg-cBgLight border-2 border-cYellow': item.amount,
        'bg-cBgDarker': !item.amount,
        'opacity-50': gold < item.gold && !item.amount,
        'mb-4': items.indexOf(item) < items.length - 1,
      }"
      @click="item.onBuy()"
    >
      <div class="flex gap-4 items-center">
        <img v-if="item.image" class="w-15 h-15" :src="item.image" />
        <div v-else class="rounded-lg w-15 h-15 bg-cBgDark" />
        <div class="flex flex-1 flex-col gap-2">
          <div class="text-sm font-bold text-white">
            {{ item.label }}
          </div>
          <div class="text-xs text-gray-400">
            {{ item.description }}
          </div>
          <div class="text-xs text-gray-400">Gold: {{ item.gold }}</div>
        </div>
        <div>{{ item.amount }}</div>
      </div>
    </div>
  </div>
</template>
