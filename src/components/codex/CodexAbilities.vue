<script setup lang="ts">
import { COLORS } from "@/constants";
import { Button, CodexPoints } from "@/components";

defineProps<{
  points: number;
  abilities: {
    label: string;
    description: string;
    rage: number;
    isUnlocked: boolean;
    isSelected: boolean;
    isActive: boolean;
    onSelect: () => void;
    onActivate: () => void;
  }[];
}>();
</script>

<template>
  <div class="flex-1 text-sm text-gray-300 p-4 border-b-2 border-yellow-400">
    <CodexPoints>{{ points }}</CodexPoints>

    <div
      v-for="ability in abilities"
      class="flex flex-col items-center justify-center gap-2 p-4 rounded-lg"
      :class="{
        'bg-stone-600': ability.isSelected,
        'bg-stone-800': !ability.isSelected,
        'opacity-50': points < 5 && !ability.isUnlocked,
        'mb-4': abilities.indexOf(ability) < abilities.length - 1,
        'border-2 border-white': ability.isActive,
      }"
    >
      <div class="text-lg font-bold text-white">
        {{ ability.label }}
      </div>
      <div class="text-sm text-gray-400 text-center">
        {{ ability.description }}
      </div>
      <div class="text-sm text-gray-400 text-center">
        {{ ability.rage }} Rage
      </div>
      <div class="flex justify-center gap-4">
        <Button
          :label="
            !ability.isUnlocked
              ? 'Unlock'
              : !ability.isSelected
              ? 'Select'
              : 'Deselect'
          "
          :on-click="ability.onSelect"
          :color-classes="COLORS.STATS_BUTTON"
        />
        <Button
          v-if="ability.isSelected"
          :label="!ability.isActive ? 'Activate' : 'Deactivate'"
          :on-click="ability.onActivate"
          :color-classes="COLORS.STATS_BUTTON"
        />
      </div>
    </div>
  </div>
</template>
1
