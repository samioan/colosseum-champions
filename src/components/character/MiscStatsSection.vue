<script setup lang="ts">
defineProps<{
  stats: {
    image: string;
    stat: number;
    maxStat?: number;
  }[];
}>();
</script>

<template>
  <div class="flex flex-col gap-2">
    <div class="flex gap-2 text-xs items-center" v-for="statObj in stats">
      <img
        :src="statObj.image"
        class="bg-cBgDarker border border-cBgLight rounded-lg"
      />
      <span>{{ statObj.stat }}</span>
      <span v-if="statObj.maxStat">/</span>
      <span>{{ statObj.maxStat }}</span>
    </div>
  </div>
</template>
