<script setup lang="ts">
import { Icon } from "@/components";

defineProps<{
  items: {
    image: string;
    onClick?: () => void;
    customClasses?: string;
    amount?: number;
    isLight?: boolean;
  }[];
}>();
</script>

<template>
  <div class="flex flex-wrap justify-center gap-4">
    <Icon
      v-for="item in items"
      :image="item.image"
      :on-click="item.onClick"
      :amount="item.amount"
      :custom-classes="`w-15 h-15 p-2 rounded-lg ${item.customClasses}`"
      :is-light="item.isLight"
    />
  </div>
</template>
