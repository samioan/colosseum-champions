<script setup lang="ts">
import { useRouter } from "vue-router";
import { ROUTES, LABELS } from "@/constants";
import { usePlayerStore } from "@/stores";
import { createGladiator } from "@/utils";
import { Button } from "@/components";

const router = useRouter();
const playerStore = usePlayerStore();

const buttons = [
  {
    text: LABELS.tutorial,
    onClick: () => {},
  },
  {
    text: LABELS.questForGlory,
    onClick: () => {
      playerStore.player = createGladiator();
      router.push(ROUTES.creation);
    },
  },
  {
    text: LABELS.options,
    onClick: () => {},
  },
];
</script>

<template>
  <div
    class="flex flex-col bg-cBgDarker mx-auto gap-4 p-4 h-screen lg:w-1/2 md:w-2/3 sm:w-3/4 w-full overflow-y-auto scrollbar-hidden justify-center"
  >
    <div class="flex flex-col w-full justify-center items-center gap-4">
      <span class="text-cYellow text-[24px] text-center">{{
        LABELS.colosseumChampions
      }}</span>
      <Button v-for="button in buttons" :on-click="button.onClick">
        {{ button.text }}
      </Button>
    </div>
  </div>
</template>
