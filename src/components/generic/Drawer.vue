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
  <transition name="fade">
    <div
      v-if="open"
      class="fixed inset-0 bg-black/70 z-40 transition-opacity"
      @click="open = false"
    ></div>
  </transition>

  <transition name="slide-up">
    <div
      v-if="open"
      class="fixed left-0 bottom-0 w-full rounded-t-xl bg-cBgDark z-50 transform transition-transform duration-300 ease-in-out flex flex-col max-h-[90vh]"
    >
      <div class="p-4 flex justify-between items-center">
        <h2 class="text-lg font-bold text-gray-100">{{ title }}</h2>
        <button @click="open = false" class="text-gray-300 cursor-pointer">
          X
        </button>
      </div>

      <div class="overflow-y-auto scrollbar-hidden">
        <slot name="content" />
      </div>
    </div>
  </transition>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-up-enter-active,
.slide-up-leave-active {
  transition: transform 0.3s ease-in-out;
}
.slide-up-enter-from,
.slide-up-leave-to {
  transform: translateY(100%);
}
</style>
