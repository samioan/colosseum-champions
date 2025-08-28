<script setup lang="ts">
import { IconSize } from "@/enums";

withDefaults(
  defineProps<{
    image: string;
    onClick?: () => void;
    customClasses?: string;
    isLight?: boolean;
    size?: IconSize;
  }>(),
  {
    size: IconSize.SMALL,
  }
);
</script>

<template>
  <div class="relative">
    <img
      :src="image"
      class="border border-cBgLight rounded-lg relative p-1"
      @click="onClick"
      :class="[
        customClasses,
        isLight ? 'bg-cBgDark' : 'bg-cBgDarker',
        {
          'w-8 h-8': size === IconSize.SMALL,
          'w-13 h-13': size === IconSize.MEDIUM,
          'w-20 h-20': size === IconSize.LARGE,
        },
      ]"
    />
    <div
      class="absolute bottom-0 right-0 bg-cBgLight text-xs px-1 rounded-tl-lg rounded-br-lg"
    >
      <slot />
    </div>
  </div>
</template>
