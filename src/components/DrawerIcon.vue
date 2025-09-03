<script setup lang="ts">
import { Icon } from "@/components";
import { IconSize } from "@/enums";

withDefaults(
  defineProps<{
    isActive?: boolean;
    isEquipped?: boolean;
    image?: string;
    onSelect?: () => void;
    overlayText?: string;
  }>(),
  {
    isActive: false,
    isEquipped: false,
    image: "",
    onSelect: () => {},
    overlayText: "",
  }
);
</script>

<template>
  <div
    class="rounded-lg"
    :class="{
      'border border-cYellow': isActive,
      'border border-white': isEquipped,
    }"
  >
    <Icon :image="image" :size="IconSize.LARGE" :on-click="onSelect" is-light>{{
      overlayText
    }}</Icon>
  </div>
</template>
