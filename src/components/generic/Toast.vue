<template>
  <transition
    enter-active-class="transition transform ease-out duration-300"
    enter-from-class="opacity-0 scale-95"
    enter-to-class="opacity-100 scale-100"
    leave-active-class="transition transform ease-in duration-200"
    leave-from-class="opacity-100 scale-100"
    leave-to-class="opacity-0 scale-95"
  >
    <div
      v-if="visible"
      class="fixed top-4 left-1/2 -translate-x-1/2 bg-gray-800 text-white px-6 py-3 rounded-lg shadow-lg z-50"
    >
      {{ message }}
    </div>
  </transition>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";

const props = defineProps<{
  message: string;
  show: boolean;
  duration?: number;
}>();

const emit = defineEmits<{
  (e: "update:show", value: boolean): void;
}>();

const visible = ref(props.show);

watch(
  () => props.show,
  (val) => {
    visible.value = val;
    if (val && props.duration !== 0) {
      setTimeout(() => {
        emit("update:show", false);
      }, props.duration ?? 3000);
    }
  }
);
</script>
