<script setup lang="ts">
import { CardHeader, CardStatBar, CardContainer } from "@/components";

defineProps<{
  headerProps: {
    name: string;
    level: number;
  };
  mainStats: {
    label: string;
    stat: number;
    maxStat: number;
    colorClass: string;
  }[];
  abilities?: {
    isActive: boolean;
    label: string;
    onActivate: () => void;
  }[];
  items?: {
    label: string;
    onUse: () => void;
    amount: number;
  }[];
}>();
</script>

<template>
  <CardContainer>
    <CardHeader v-bind="headerProps" />

    <div class="flex gap-4">
      <div class="flex-1 flex flex-col gap-3">
        <CardStatBar v-for="stat in mainStats" v-bind="stat" />
      </div>
    </div>

    <div class="flex gap-2 mt-2 justify-center" v-if="abilities?.length">
      <div
        class="flex gap-2 p-2 items-center justify-center rounded-lg text-sm bg-stone-600 cursor-pointer"
        :class="{
          'border-2 border-white': ability.isActive,
        }"
        v-for="ability in abilities"
        @click="ability.onActivate"
      >
        {{ ability.label }}
      </div>
    </div>

    <div class="flex gap-2 mt-2 justify-center" v-if="items?.length">
      <div
        class="flex gap-2 p-2 items-center justify-center rounded-lg text-sm bg-stone-600 text-center cursor-pointer"
        v-for="item in items"
        @click="item.onUse"
        :class="item.amount ? '' : 'hidden'"
      >
        {{ item.label }} {{ item.amount }}
      </div>
    </div>
  </CardContainer>
</template>
