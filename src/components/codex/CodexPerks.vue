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
  <div class="flex-1 text-sm p-2">
    <div
      v-for="perk in perks"
      class="p-2 rounded-xl mb-2"
      :class="{
        'bg-cBgLight border-2 border-cYellow': perk.isEquipped,
        'bg-cBgDarker': !perk.isEquipped,
        'opacity-50': points < perk.points && !perk.isUnlocked,
        'mb-2': perks.indexOf(perk) < perks.length - 1,
      }"
      @click="perk.onSelect"
    >
      <div class="flex gap-2 items-center">
        <img v-if="perk.image" class="w-15 h-15" :src="perk.image" />
        <div v-else class="rounded-lg w-15 h-15 bg-cBgDark" />
        <div class="flex flex-col gap-2 flex-1">
          <div>
            {{ perk.label }}
          </div>
          <div class="text-xs">
            {{ perk.description }}
          </div>
          <div class="text-xs">Points: {{ perk.points }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
