<script setup lang="ts">
defineProps<{
  points: number;
  perks: {
    image: string;
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
  <div class="flex-1 text-sm text-gray-300 p-4">
    <div
      v-for="perk in perks"
      class="p-4 rounded-xl mb-4"
      :class="{
        'bg-cBgLight border-2 border-cYellow': perk.isEquipped,
        'bg-cBgDarker': !perk.isEquipped,
        'opacity-50': points < perk.points && !perk.isUnlocked,
        'mb-4': perks.indexOf(perk) < perks.length - 1,
      }"
      @click="perk.onSelect"
    >
      <div class="flex gap-4 items-center">
        <img v-if="perk.image" class="w-15 h-15" :src="perk.image" />
        <div v-else class="rounded-lg w-15 h-15 bg-cBgDark" />
        <div class="flex flex-col gap-2 flex-1">
          <div class="font-bold text-white">
            {{ perk.label }}
          </div>
          <div class="text-xs text-gray-400">
            {{ perk.description }}
          </div>
          <div class="text-xs text-gray-400">Points: {{ perk.points }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
