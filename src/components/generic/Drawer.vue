<script setup lang="ts">
import { watch, onUnmounted } from "vue";

defineProps<{
  title: string;
}>();

const open = defineModel<boolean>();

watch(open, (val) => {
  document.body.style.overflow = val ? "hidden" : "";
});
onUnmounted(() => {
  document.body.style.overflow = "";
});
</script>

<template>
  <div
    v-show="open"
    class="fixed inset-0 bg-black/70 z-40 transition-opacity"
    @click="() => (open = !open)"
  ></div>

  <div
    :class="[
      'fixed left-0 bottom-0 w-full rounded-t-xl bg-stone-800 shadow-xl z-50 transform transition-transform duration-300 ease-in-out flex flex-col h-[90vh] border-2 border-yellow-400',
      open ? 'translate-y-0' : 'translate-y-full',
    ]"
  >
    <div
      class="p-4 border-b-2 border-yellow-400 flex justify-between items-center"
    >
      <h2 class="text-lg font-bold text-gray-100">{{ title }}</h2>
      <button
        @click="() => (open = false)"
        class="text-gray-300 cursor-pointer"
      >
        X
      </button>
    </div>

    <div class="overflow-y-auto scrollbar-hidden">
      <slot name="content" />
    </div>
  </div>
</template>
