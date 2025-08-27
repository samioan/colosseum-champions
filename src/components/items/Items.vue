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
  <div class="p-2">
    <div
      v-for="item in items"
      class="p-2 rounded-xl"
      :class="{
        'bg-cBgLight border-2 border-cYellow': item.amount,
        'bg-cBgDarker': !item.amount,
        'opacity-50': gold < item.gold && !item.amount,
        'mb-2': items.indexOf(item) < items.length - 1,
      }"
      @click="item.onBuy()"
    >
      <div class="flex gap-2 items-center">
        <div class="relative">
          <img v-if="item.image" class="w-15 h-15" :src="item.image" />
          <div v-else class="rounded-lg w-15 h-15 bg-cBgDark" />
          <div
            class="absolute bottom-0 right-0 bg-cBgDarker text-xs px-1 rounded-full"
          >
            {{ item.amount }}
          </div>
        </div>
        <div class="flex flex-1 flex-col gap-2">
          <div class="text-sm">
            {{ item.label }}
          </div>
          <div class="text-xs">
            {{ item.description }}
          </div>
          <div class="text-xs">Gold: {{ item.gold }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
