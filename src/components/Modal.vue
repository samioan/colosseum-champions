<script setup lang="ts">
import { watch, onUnmounted } from "vue";

const open = defineModel<boolean>();

watch(open, (val) => {
  document.body.style.overflow = val ? "hidden" : "";
});

onUnmounted(() => {
  document.body.style.overflow = "";
});
</script>

<template>
  <Teleport to="body">
    <div v-if="open" class="fixed inset-0 bg-black/70 z-50" />
    <Transition
      enter-active-class="transition ease-out duration-300"
      enter-from-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="transition ease-in duration-200"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >
      <div
        v-if="open"
        class="fixed inset-0 flex items-center justify-center z-50"
        @click="open = false"
      >
        <div class="bg-cBgDarker text-center p-4 w-[90%] max-w-md rounded-xl">
          <slot />
        </div>
      </div> </Transition
  ></Teleport>
</template>
