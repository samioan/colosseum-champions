<script setup lang="ts">
import { Icon } from "@/components";
import { IconSize } from "@/enums";

defineProps<{
  items: {
    image: string;
    onClick?: () => void;
    customClasses?: string;
    amount?: number;
  }[];
}>();
</script>

<template>
  <div class="flex flex-wrap justify-center gap-4">
    <Icon
      v-for="item in items"
      :image="item.image"
      :on-click="item.onClick"
      :size="IconSize.MEDIUM"
      :custom-classes="item.customClasses"
    >
      {{ item?.amount }}
    </Icon>
  </div>
</template>
