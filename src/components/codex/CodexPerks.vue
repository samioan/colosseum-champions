<script setup lang="ts">
import { COLORS } from "@/constants";
import { Button, CodexPoints, Dropdown } from "@/components";

defineProps<{
  points: number;
  perks: {
    label: string;
    description: string;
    isUnlocked: boolean;
    isSelected: boolean;
    onSelect: () => void;
  }[];
}>();
</script>

<template>
  <div class="flex-1 text-sm text-gray-300 p-4 border-b-2 border-yellow-400">
    <CodexPoints>{{ points }}</CodexPoints>

    <div
      v-for="perk in perks"
      class="flex flex-col items-center justify-center gap-2 p-4 rounded-lg"
      :class="{
        'bg-stone-600': perk.isSelected,
        'bg-stone-900': !perk.isSelected,
        'opacity-50': points < 5 && !perk.isUnlocked,
        'mb-4': perks.indexOf(perk) < perks.length - 1,
      }"
    >
      <Dropdown>
        <template #header>
          <div class="text-lg font-bold text-white text-center">
            {{ perk.label }}
          </div></template
        >
        <template #content>
          <div class="flex flex-col gap-2 pt-2">
            <div class="text-sm text-gray-400 text-center">
              {{ perk.description }}
            </div>
            <div class="flex justify-center gap-4">
              <Button
                :label="
                  !perk.isUnlocked
                    ? 'Unlock'
                    : !perk.isSelected
                    ? 'Select'
                    : 'Deselect'
                "
                :on-click="perk.onSelect"
                :color-classes="COLORS.statsButton"
              />
            </div></div
        ></template>
      </Dropdown>
    </div>
  </div>
</template>
1
