<script setup lang="ts">
import { Button } from "@/components";
import { computed, watch, onUnmounted } from "vue";
import { LABELS } from "@/constants";

const props = defineProps<{
  isVisible: boolean;
  onClick: () => void;
}>();

const modalButtonProps = computed(() => ({
  onClick: props.onClick,
  label: LABELS.CONTINUE,
  colorClasses: "bg-amber-600 text-white hover:bg-amber-700",
}));

watch(
  props,
  (val) => {
    document.body.style.overflow = val.isVisible ? "hidden" : "";
  },
  { deep: true }
);
onUnmounted(() => {
  document.body.style.overflow = "";
});
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
      class="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
    >
      <div
        class="bg-stone-800 text-center p-6 w-[90%] max-w-md border-2 border-yellow-400 rounded-xl"
      >
        <slot />
        <Button v-bind="modalButtonProps" />
      </div>
    </div>
  </Transition>
</template>
