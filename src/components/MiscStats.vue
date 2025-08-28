<script setup lang="ts">
import { Icon } from "@/components";

defineProps<{
  stats: {
    image: string;
    stat: number;
    maxStat?: number;
  }[];
}>();
</script>

<template>
  <div class="flex flex-wrap gap-2">
    <div class="flex gap-2 text-xs items-center" v-for="statObj in stats">
      <Icon :image="statObj.image" />
      <span>{{ statObj.stat }}</span>
      <span v-if="statObj.maxStat">/</span>
      <span>{{ statObj.maxStat }}</span>
    </div>
  </div>
</template>
