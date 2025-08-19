<script setup lang="ts">
import { Button, Dropdown } from "@/components";
import { LABELS } from "@/constants";

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
  <div class="flex-1 p-4 pt-0 mt-[70px]">
    <div
      class="absolute top-[59px] w-full p-4 bg-cBgDark left-0 flex items-center justify-between gap-2 pb-4 mb-4"
    >
      <span class="font-medium">{{ LABELS.gold }}</span>
      {{ gold }}
    </div>
    <div
      v-for="item in items"
      class="flex flex-col items-center justify-center gap-2 p-4 rounded-lg"
      :class="{
        'bg-cBgLight': item.amount,
        'bg-cBgDarker': !item.amount,
        'mb-4': items.indexOf(item) < items.length - 1,
      }"
    >
      <Dropdown>
        <template #header>
          <div class="text-lg font-bold text-white text-center">
            {{ item.label }} {{ item.amount }}
          </div>
        </template>
        <template #content>
          <div class="flex flex-col gap-2 pt-2">
            <div class="text-sm text-gray-400 text-center">
              {{ item.description }}
            </div>
            <div class="flex justify-center gap-4">
              <Button
                label="Buy"
                :disabled="gold < item.gold"
                :on-click="item.onBuy"
                color-classes="bg-cBlue"
              />
            </div>
          </div>
        </template>
      </Dropdown>
    </div>
  </div>
</template>
