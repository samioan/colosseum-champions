<script setup lang="ts">
import { Icon } from "@/components";
import { IconSize } from "@/enums";

defineProps<{
  footerButtons: {
    onClick: () => void;
    image: string;
  }[];
}>();
</script>

<template>
  <div class="fixed bottom-0 left-0 w-full">
    <div
      class="flex flex-wrap gap-4 p-4 justify-center w-full mx-auto bg-cBgDarker border-t border-cBgLight"
    >
      <Icon
        v-for="button in footerButtons"
        :image="button.image"
        :on-click="button.onClick"
        :size="IconSize.MEDIUM"
        is-light
      />
    </div>
  </div>
</template>
