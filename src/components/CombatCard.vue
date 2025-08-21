<script setup lang="ts">
import { CardHeader, CardStatBar } from "@/components";

defineProps<{
  headerProps: {
    name: string;
    level: number;
  };
  mainStats: {
    label: string;
    stat: number;
    maxStat?: number;
    colorClass: string;
  }[];
  abilities?: {
    image: string;
    isActive: boolean;
    label: string;
    onActivate: () => void;
    cooldown: number;
    maxCooldown: number;
  }[];
  items?: {
    image: string;
    label: string;
    onUse: () => void;
    amount: number;
  }[];
}>();
</script>

<template>
  <div class="bg-cBgDark p-4 flex flex-col gap-4 w-full">
    <CardHeader v-bind="headerProps" />

    <div class="flex gap-4">
      <div class="flex-1 flex flex-col gap-3">
        <CardStatBar v-for="stat in mainStats" v-bind="stat" />
      </div>
    </div>
    <div
      class="flex flex-wrap gap-4 mt-2 justify-center"
      v-if="abilities?.length"
    >
      <div
        class="relative flex flex-col gap-2 p-2 items-center justify-center rounded-lg text-sm bg-cBgLight cursor-pointer overflow-hidden"
        :class="{
          'border-2 border-cYellow': ability.isActive,
        }"
        v-for="ability in abilities"
        :key="ability.label"
        @click="ability.onActivate"
      >
        <div
          class="absolute bottom-0 left-0 w-full bg-cOrange transition-all duration-500 ease-out"
          :style="{
            height: `${(ability.cooldown / ability.maxCooldown) * 100}%`,
          }"
        ></div>

        <img
          v-if="ability.image"
          class="w-10 h-10 bg-cBgLight rounded-lg object-cover relative z-10"
          :src="ability.image"
        />
        <div v-else class="rounded-lg w-10 h-10 bg-cBgDarker relative z-10" />
      </div>
    </div>

    <div class="flex flex-wrap gap-4 mt-2 justify-center" v-if="items?.length">
      <div v-for="item in items" class="flex gap-2 items-center relative">
        <img
          class="w-15 h-15 object-cover p-2 rounded-lg bg-cBgLight"
          :src="item.image"
          @click="item.onUse"
        />
        <div
          class="absolute bottom-0 right-0 bg-cBgDarker text-white text-xs px-1 rounded-tl-lg rounded-br-lg"
        >
          {{ item.amount }}
        </div>
      </div>
    </div>
  </div>
</template>
