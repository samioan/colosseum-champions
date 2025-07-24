<script setup lang="ts">
defineProps<{
  disabled?: boolean;
  onClick: () => void;
  label?: string;
  colorClasses?: string;
}>();
</script>

<template>
  <button
    :disabled="disabled"
    @click="onClick"
    class="px-3 py-2 rounded-lg font-semibold text-sm transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
    :class="colorClasses"
  >
    {{ label }}
  </button>
</template>
