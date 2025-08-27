<script setup lang="ts">
import { useRouter } from "vue-router";
import { ROUTES, LABELS } from "@/constants";
import { usePlayerStore } from "@/stores";
import { createGladiator } from "@/utils";
import { Button, PageContainer } from "@/components";

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
  <PageContainer class="justify-center">
    <div class="flex flex-col w-full justify-center items-center gap-4">
      <span class="text-cYellow text-[24px] text-center">{{
        LABELS.colosseumChampions
      }}</span>
      <Button v-for="button in buttons" :on-click="button.onClick">
        {{ button.text }}
      </Button>
    </div>
  </PageContainer>
</template>
