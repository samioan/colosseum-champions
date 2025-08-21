<script setup lang="ts">
import { EQUIPMENT_LABELS } from "@/constants";
import type { EquipmentSlot } from "@/enums";
import { computed } from "vue";

const props = defineProps<{
  gold: number;
  equipment: {
    image: string;
    label: string;
    description: string;
    gold: number;
    slot: EquipmentSlot;
    isEquipped: boolean;
    isUnlocked: boolean;
    onBuy: () => void;
    onEquip: () => void;
  }[];
}>();

const equipmentCategories = computed(() => {
  return props.equipment.reduce((acc, item) => {
    if (!acc[item.slot]) {
      acc[item.slot] = [];
    }
    acc[item.slot].push(item);
    return acc;
  }, {} as Record<EquipmentSlot, typeof props.equipment>);
});
</script>

<template>
  <div class="flex-1 text-sm text-gray-300 p-4">
    <div v-for="category in Object.entries(equipmentCategories)">
      <div class="mb-4">
        {{ EQUIPMENT_LABELS[category[0] as EquipmentSlot] }}
      </div>
      <div
        v-for="item in category[1]"
        class="p-4 rounded-xl mb-4"
        :class="{
          'bg-cBgLight': item.isUnlocked,
          'bg-cBgDarker': !item.isUnlocked,
          'border-2 border-cYellow': item.isEquipped,
          'opacity-50': gold < item.gold && !item.isUnlocked,
          'mb-4': equipment.indexOf(item) < equipment.length - 1,
        }"
        @click="item.isUnlocked ? item.onEquip() : item.onBuy()"
      >
        <div class="flex gap-4 items-center">
          <img v-if="item.image" class="w-15 h-15" :src="item.image" />
          <div v-else class="rounded-lg w-15 h-15 bg-cBgDark" />
          <div class="flex flex-col gap-2">
            <div class="font-bold text-white">
              {{ item.label }}
            </div>
            <div class="text-xs text-gray-400">
              {{ item.description }}
            </div>
            <div class="text-xs text-gray-400">Gold: {{ item.gold }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
