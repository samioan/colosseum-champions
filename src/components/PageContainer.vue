<script setup lang="ts">
defineProps<{
  customClass?: string;
}>();
</script>

<template>
  <div
    class="bg-gray-800 flex bg-cover bg-center bg-no-repeat before:content-[''] before:fixed before:left-0 before:right-0 before:top-0 before:bottom-0 before:w-auto before:h-auto before:overflow-hidden before:opacity-[0.7] before:bg-black min-w-screen min-h-screen"
    :class="customClass"
  >
    <slot />
  </div>
</template>
