<script setup lang="ts">
import type { Enemy } from "@/types";

defineProps<{
  gladiator?: Enemy;
}>();
</script>

<template>
  <div
    class="bg-white dark:bg-gray-800 border border-red-400 dark:border-red-700 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 p-4 m-4 min-w-[300px] w-full flex flex-col gap-3"
  >
    <!-- Header -->
    <div class="flex justify-between items-center">
      <h2
        class="text-lg font-bold text-gray-800 dark:text-gray-100 tracking-wide flex items-center gap-2"
      >
        ⚔️ Opponent: {{ gladiator?.name }}
      </h2>
    </div>

    <!-- Stats -->
    <div
      class="grid grid-cols-2 gap-2 text-sm text-gray-700 dark:text-gray-300"
    >
      <div class="flex items-center justify-between">
        <span class="font-medium">❤️ Health</span>
        <span>{{ gladiator?.health }} / {{ gladiator?.maxHealth }}</span>
      </div>
      <div class="flex items-center justify-between">
        <span class="font-medium">⚡ Stamina</span>
        <span>{{ gladiator?.stamina }} / {{ gladiator?.maxStamina }}</span>
      </div>
      <div class="flex items-center justify-between">
        <span class="font-medium">💪 Strength</span>
        <span>{{ gladiator?.strength }}</span>
      </div>
    </div>
  </div>
</template>
