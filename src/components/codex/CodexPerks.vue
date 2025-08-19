<script setup lang="ts">
import { Button, CodexPoints, Dropdown } from "@/components";

defineProps<{
  points: number;
  perks: {
    label: string;
    description: string;
    isUnlocked: boolean;
    isEquipped: boolean;
    points: number;
    onSelect: () => void;
  }[];
}>();
</script>

<template>
  <div class="flex-1 text-sm text-gray-300 p-4 pt-0 mt-[70px]">
    <CodexPoints>{{ points }}</CodexPoints>

    <div
      v-for="perk in perks"
      class="flex flex-col items-center justify-center gap-2 p-4 rounded-lg"
      :class="{
        'bg-cBgLight': perk.isEquipped,
        'bg-cBgDarker': !perk.isEquipped,
        'opacity-50': points < perk.points && !perk.isUnlocked,
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
                    : !perk.isEquipped
                    ? 'Select'
                    : 'Deselect'
                "
                :on-click="perk.onSelect"
                color-classes="bg-cBlue"
              />
            </div></div
        ></template>
      </Dropdown>
    </div>
  </div>
</template>
