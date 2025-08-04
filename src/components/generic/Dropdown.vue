<script setup lang="ts">
import { ref } from "vue";

const isOpen = ref(false);
const content = ref<HTMLElement | null>(null);

const toggle = () => {
  isOpen.value = !isOpen.value;
};
</script>

<template>
  <div class="w-full">
    <div @click="toggle" class="cursor-pointer select-none">
      <slot name="header" />
    </div>

    <div v-show="isOpen" ref="content">
      <slot name="content" />
    </div>
  </div>
</template>
