<script setup lang="ts">
import { useRouter } from "vue-router";
import { ROUTES, LABELS } from "@/constants";
import { usePlayerStore, useGameStore } from "@/stores";
import { createGladiator } from "@/utils";
import { Button } from "@/components";
import { logo } from "@/assets";

const router = useRouter();
const playerStore = usePlayerStore();
const gameStore = useGameStore();

const buttons = [
  {
    text: LABELS.TUTORIAL,
    onClick: () => {},
  },
  {
    text: LABELS.QUEST_FOR_GLORY,
    onClick: () => {
      gameStore.stage = 1;
      playerStore.player = createGladiator();
      router.push(ROUTES.character);
    },
  },
  {
    text: LABELS.OPTIONS,
    onClick: () => {},
  },
];
</script>

<template>
  <div
    class="flex flex-col mx-auto gap-4 p-4 h-screen lg:w-1/2 md:w-2/3 sm:w-3/4 w-full overflow-y-auto scrollbar-hidden justify-center relative"
  >
    <div
      class="flex flex-col w-full justify-center items-center gap-4 flex-grow"
    >
      <img :src="logo" class="max-h-128 object-contain flex-shrink-0" />
      <Button v-for="button in buttons" :on-click="button.onClick">
        {{ button.text }}
      </Button>
    </div>
  </div>
</template>
