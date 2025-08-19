<script setup lang="ts">
import { Button, CodexPoints, Dropdown } from "@/components";

defineProps<{
  points: number;
  abilities: {
    label: string;
    description: string;
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
  <div class="flex-1 text-sm text-gray-300 p-4 pt-0 mt-[70px]">
    <CodexPoints>{{ points }}</CodexPoints>

    <div
      v-for="ability in abilities"
      class="flex flex-col items-center justify-center gap-2 p-4 rounded-lg"
      :class="{
        'bg-cBgLight': ability.isEquipped,
        'bg-cBgDarker': !ability.isEquipped,
        'opacity-50': points < ability.points && !ability.isUnlocked,
        'mb-4': abilities.indexOf(ability) < abilities.length - 1,
        'border-2 border-white': ability.isActive,
      }"
    >
      <Dropdown>
        <template #header>
          <div class="text-lg font-bold text-white text-center">
            {{ ability.label }}
          </div>
        </template>
        <template #content>
          <div class="flex flex-col gap-2 pt-2">
            <div class="text-sm text-gray-400 text-center">
              {{ ability.description }}
            </div>
            <div class="text-sm text-gray-400 text-center">
              {{ ability.stamina }} Stamina
            </div>
            <div class="text-sm text-gray-400 text-center">
              Points: {{ ability.points }}
            </div>
            <div class="flex justify-center gap-4">
              <Button
                :label="
                  !ability.isUnlocked
                    ? 'Unlock'
                    : !ability.isEquipped
                    ? 'Select'
                    : 'Deselect'
                "
                :on-click="ability.onSelect"
                color-classes="bg-cBlue"
              />
              <Button
                v-if="ability.isEquipped"
                :label="!ability.isActive ? 'Activate' : 'Deactivate'"
                :on-click="ability.onActivate"
                color-classes="bg-cBlue"
              />
            </div></div
        ></template>
      </Dropdown>
    </div>
  </div>
</template>
