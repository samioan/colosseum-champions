<script setup lang="ts">
import { Icon } from "@/components";

defineProps<{
  stats: {
    onClick: () => void;
    image: string;
    stat: number;
  }[];
  points: number;
}>();
</script>

<template>
  <div class="flex flex-col gap-2">
    <div v-for="statObj in stats">
      <div
        class="flex items-center justify-between"
        @click.stop="statObj.onClick"
      >
        <div class="flex gap-2 items-center">
          <Icon :image="statObj.image" />
          <span>{{ statObj.stat }}</span>
        </div>

        <button v-if="points" class="px-2 py-1 text-xs rounded-lg bg-cBgLight">
          +
        </button>
      </div>
    </div>
  </div>
</template>
