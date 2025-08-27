<script setup lang="ts">
defineProps<{
  image: string;
  onClick?: () => void;
  customClasses?: string;
  isLight?: boolean;
  amount?: number;
}>();
</script>

<template>
  <div class="relative">
    <img
      :src="image"
      class="border border-cBgLight rounded-lg relative"
      @click="onClick"
      :class="[customClasses, isLight ? 'bg-cBgDark' : 'bg-cBgDarker']"
    />
    <div
      class="absolute bottom-0 right-0 bg-cBgLight text-xs px-1 rounded-tl-lg rounded-br-lg"
    >
      {{ amount }}
    </div>
  </div>
</template>
