<script setup lang="ts">
defineProps<{
  disabled?: boolean;
  onClick: () => void;
}>();
</script>

<template>
  <button
    :disabled="disabled"
    class="bg-cBgLight w-full p-2 rounded-lg cursor-pointer"
    :class="{ 'opacity-50': disabled }"
    @click.stop="onClick"
  >
    <slot />
  </button>
</template>
