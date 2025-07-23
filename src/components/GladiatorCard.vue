<script setup lang="ts">
import type { Gladiator } from "@/types";

defineProps<{
  gladiator: Gladiator;
  trainingDisabled: boolean;
  onClickTraining: () => void;
  trainingLabel: string;
  fightingDisabled: boolean;
  onClickFighting: () => void;
  fightingLabel: string;
  restingDisabled: boolean;
  onClickResting: () => void;
  restingLabel: string;
}>();
</script>

<template>
  <div
    class="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 p-4 m-4 min-w-[300px] w-full flex flex-col gap-3"
  >
    <!-- Header -->
    <div class="flex justify-between items-center">
      <h2
        class="text-lg font-bold text-gray-800 dark:text-gray-100 tracking-wide"
      >
        🏛️ {{ gladiator.name }}
      </h2>
      <span
        class="text-xs px-2 py-1 rounded-full bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200 font-semibold"
      >
        Lv. {{ gladiator.level }}
      </span>
    </div>

    <!-- Stats -->
    <div
      class="grid grid-cols-2 gap-2 text-sm text-gray-700 dark:text-gray-300"
    >
      <div class="flex items-center justify-between">
        <span class="font-medium">❤️ Health</span>
        <span>{{ gladiator.health }} / {{ gladiator.maxHealth }}</span>
      </div>
      <div class="flex items-center justify-between">
        <span class="font-medium">⚡ Stamina</span>
        <span>{{ gladiator.stamina }} / {{ gladiator.maxStamina }}</span>
      </div>
      <div class="flex items-center justify-between">
        <span class="font-medium">💪 Strength</span>
        <span>{{ gladiator.strength }}</span>
      </div>
      <div class="flex items-center justify-between">
        <span class="font-medium">⭐ XP</span>
        <span>{{ gladiator.experience }} / {{ gladiator.maxExperience }}</span>
      </div>
    </div>

    <!-- Buttons -->
    <div class="flex flex-col gap-2 mt-2">
      <button
        :disabled="trainingDisabled"
        @click="onClickTraining"
        class="px-3 py-2 rounded-lg font-semibold text-sm transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed bg-green-600 text-white hover:bg-green-700"
      >
        {{ trainingLabel }}
      </button>
      <button
        :disabled="fightingDisabled"
        @click="onClickFighting"
        class="px-3 py-2 rounded-lg font-semibold text-sm transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed bg-red-600 text-white hover:bg-red-700"
      >
        {{ fightingLabel }}
      </button>
      <button
        :disabled="restingDisabled"
        @click="onClickResting"
        class="px-3 py-2 rounded-lg font-semibold text-sm transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed bg-yellow-500 text-gray-900 hover:bg-yellow-600"
      >
        {{ restingLabel }}
      </button>
    </div>
  </div>
</template>
