<script setup lang="ts">
import { CardStatBar } from "@/components";
import { LABELS } from "@/constants";

defineProps<{
  headerProps?: {
    name: string;
    level: number;
  };
  mainStats?: {
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
  <div
    class="bg-cBgDark flex flex-col w-full border-4 border-t-2 border-gray-500"
  >
    <div
      v-if="headerProps"
      class="flex justify-between items-center gap-4 p-2 border-b-2 border-gray-500"
    >
      <h2 class="text-xs font-bold text-gray-100">
        {{ headerProps.name }}
      </h2>
      <span
        class="text-xs px-2 py-1 rounded-full bg-yellow-900 text-yellow-200 font-semibold whitespace-nowrap"
      >
        {{ LABELS.level }} {{ headerProps.level }}
      </span>
    </div>

    <div class="flex gap-2 p-2 border-b-2 border-gray-500" v-if="mainStats">
      <div class="flex-1 flex flex-col gap-3">
        <CardStatBar v-for="stat in mainStats" v-bind="stat" />
      </div>
    </div>

    <div
      class="flex flex-wrap gap-2 p-2 justify-end items-center border-b-2 border-gray-500 min-h-[68px] relative"
    >
      <div
        class="absolute left-0 top-0 p-1 border-r-2 border-b-2 border-gray-500 text-xs z-[20] bg-cBgDarker"
      >
        ABILITIES
      </div>
      <div
        class="relative box-border flex flex-col gap-2 p-2 items-center justify-center rounded-lg text-sm bg-cBgLight cursor-pointer overflow-hidden w-12 h-12 bg-cBgLight rounded-lg"
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
          class="object-cover relative z-10"
          :src="ability.image"
        />
      </div>
    </div>

    <div
      class="flex flex-wrap gap-2 p-2 justify-end items-center min-h-[68px] relative"
    >
      <div
        class="absolute left-0 top-0 p-1 border-r-2 border-b-2 border-gray-500 text-xs z-[20] bg-cBgDarker"
      >
        ITEMS
      </div>
      <div v-for="item in items" class="flex gap-2 items-center relative">
        <img
          class="w-12 h-12 object-cover p-2 rounded-lg bg-cBgLight"
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
