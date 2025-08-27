<script setup lang="ts">
defineProps<{
  disabled?: boolean;
  onClick: () => void;
}>();
</script>

<template>
  <button
    :disabled="disabled"
    class="bg-cBgLight max-w-[400px] w-full p-2 rounded-lg cursor-pointer"
    @click.stop="onClick"
  >
    <slot />
  </button>
</template>
