<script setup lang="ts">
import { Button } from "@/components";

defineProps<{
  points: number;
  abilities: {
    label: string;
    description: string;
    image: string;
    stamina: number;
    points: number;
    isUnlocked: boolean;
    isEquipped: boolean;
    isActive: boolean;
    onSelect: () => void;
    onActivate: () => void;
  }[];
}>();
</script>

<template>
  <div class="flex-1 text-sm text-gray-300 p-4">
    <div
      v-for="ability in abilities"
      class="p-4 rounded-xl mb-4"
      :class="{
        'bg-cBgLight': ability.isEquipped,
        'bg-cBgDarker': !ability.isEquipped,
        'border-2 border-cYellow': ability.isActive,
        'opacity-50': points < ability.points && !ability.isUnlocked,
        'mb-4': abilities.indexOf(ability) < abilities.length - 1,
      }"
    >
      <div class="flex gap-4 items-center">
        <img v-if="ability.image" class="w-15 h-15" :src="ability.image" />
        <div v-else class="rounded-lg w-15 h-15 bg-cBgDark" />
        <div class="flex-1">
          <div class="flex flex-col gap-2">
            <div class="font-bold text-white">
              {{ ability.label }}
            </div>
            <div class="text-xs text-gray-400">
              {{ ability.description }}
            </div>
            <div class="text-xs text-gray-400">
              <span>{{ ability.stamina }} SP</span>
              <span> P: {{ ability.points }}</span>
            </div>
          </div>
        </div>

        <div class="flex flex-col justify-center gap-2">
          <Button
            :label="!ability.isUnlocked ? 'U' : !ability.isEquipped ? 'S' : 'D'"
            :on-click="ability.onSelect"
            color-classes="bg-cBlue"
          />
          <Button
            v-if="ability.isEquipped"
            :label="!ability.isActive ? 'A' : 'D'"
            :on-click="ability.onActivate"
            color-classes="bg-cBlue"
          />
        </div>
      </div>
    </div>
  </div>
</template>
