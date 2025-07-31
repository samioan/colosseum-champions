<script setup lang="ts">
defineProps<{
  customClass?: string;
}>();
</script>

<template>
  <div class="flex min-w-screen min-h-screen" :class="customClass">
    <slot />
  </div>
</template>
