<script setup lang="ts">
import { LABELS } from "@/constants";
</script>

<template>
  <div
    class="z-[1] absolute top-[59px] w-full p-4 bg-cBgDark left-0 flex items-center justify-between gap-2"
  >
    <span class="font-medium">{{ LABELS.points }}</span>
    <slot />
  </div>
</template>
