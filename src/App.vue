<template>
  <transition name="blackfade">
    <div v-if="showOverlay" class="fixed inset-0 bg-black z-[60]" />
  </transition>

  <RouterView />
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const showOverlay = ref(true);
const router = useRouter();

onMounted(() => {
  setTimeout(() => (showOverlay.value = false), 400);
});

router.beforeEach(async (to, from, next) => {
  showOverlay.value = true;
  await new Promise((r) => setTimeout(r, 400));
  next();
});

router.afterEach(() => {
  setTimeout(() => {
    showOverlay.value = false;
  }, 0);
});
</script>

<style>
.blackfade-enter-active,
.blackfade-leave-active {
  transition: opacity 0.4s ease;
}
.blackfade-enter-from,
.blackfade-leave-to {
  opacity: 0;
}
.blackfade-enter-to,
.blackfade-leave-from {
  opacity: 1;
}
</style>
