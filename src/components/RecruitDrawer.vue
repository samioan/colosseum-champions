<script setup lang="ts">
import type { Gladiator } from "@/types";
import { defineProps, computed } from "vue";
import { RecruitCard } from "@/components";

const props = defineProps<{
  open: boolean;
  gladiators: Gladiator[];
  selectDisabled: boolean;
  onClickSelect: (gladiator: Gladiator) => void;
  selectLabel: string;
  closeDrawer: () => void;
}>();

const recruitProps = computed(() => (gladiator: Gladiator) => ({
  gladiator: gladiator,
  selectDisabled: props.selectDisabled,
  onClickSelect: () => props.onClickSelect(gladiator),
  selectLabel: props.selectLabel,
}));
</script>

<template>
  <div
    v-show="open"
    class="fixed inset-0 bg-black/50 z-40 transition-opacity"
    @click="closeDrawer"
  ></div>

  <div
    :class="[
      'fixed top-0 left-0 h-full bg-white dark:bg-gray-900 shadow-xl z-50 transform transition-transform duration-300 ease-in-out flex flex-col ',
      open ? 'translate-x-0' : '-translate-x-full',
    ]"
  >
    <div
      class="p-4 border-b border-gray-300 dark:border-gray-700 flex justify-between items-center"
    >
      <h2 class="text-lg font-bold text-gray-800 dark:text-gray-100">
        🗂️ Recruits
      </h2>
      <button
        @click="closeDrawer"
        class="text-gray-600 dark:text-gray-300 hover:text-red-500 transition-colors"
      >
        ✖
      </button>
    </div>

    <div class="p-4 overflow-y-auto scrollbar-hidden">
      <div v-for="gladiator in gladiators">
        <RecruitCard v-bind="recruitProps(gladiator)" />
      </div>
    </div>
  </div>
</template>
