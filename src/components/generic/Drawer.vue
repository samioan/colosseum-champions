<script setup lang="ts">
import { ref } from "vue";

defineProps<{
  open: boolean;
  title: string;
}>();

const open = ref(false);
</script>

<template>
  <div
    v-show="open"
    class="fixed inset-0 bg-black/50 z-40 transition-opacity"
    @click="() => (open = !open)"
  ></div>

  <div
    :class="[
      'fixed top-0 left-0 h-full bg-gray-900 shadow-xl z-50 transform transition-transform duration-300 ease-in-out flex flex-col ',
      open ? 'translate-x-0' : '-translate-x-full',
    ]"
  >
    <div class="p-4 border-b border-gray-700 flex justify-between items-center">
      <h2 class="text-lg font-bold text-gray-100">
        {{ title }}
      </h2>
      <button
        @click="() => (open = false)"
        class="text-gray-300 hover:text-red-500 transition-colors"
      >
        ✖
      </button>
    </div>

    <div class="p-4 overflow-y-auto scrollbar-hidden">
      <slot />
    </div>
  </div>
</template>
