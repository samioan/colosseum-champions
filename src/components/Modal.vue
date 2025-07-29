<script setup lang="ts">
import { CardButton } from "@/components";
import { computed } from "vue";

const props = defineProps<{
  isVisible: boolean;
  onClick: () => void;
}>();

const modalButtonProps = computed(() => ({
  onClick: props.onClick,
  label: "Continue",
  colorClasses: "bg-amber-600 text-white hover:bg-amber-700",
}));
</script>

<template>
  <Transition
    enter-active-class="transition ease-out duration-300"
    enter-from-class="opacity-0 scale-95"
    enter-to-class="opacity-100 scale-100"
    leave-active-class="transition ease-in duration-200"
    leave-from-class="opacity-100 scale-100"
    leave-to-class="opacity-0 scale-95"
  >
    <div
      v-if="isVisible"
      class="fixed inset-0 bg-black flex items-center justify-center z-50"
    >
      <div
        class="bg-gray-800 text-center p-6 rounded-xl shadow-2xl w-[90%] max-w-md"
      >
        <slot />

        <CardButton v-bind="modalButtonProps" />
      </div>
    </div>
  </Transition>
</template>
