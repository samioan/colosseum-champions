<script setup lang="ts">
import { computed } from "vue";
import { Button, PageContainer } from "@/components";
import { logo } from "@/assets";
import { useRouter } from "vue-router";
import { ROUTES, LABELS } from "@/constants";
import { useGameStore } from "@/stores/game";

const router = useRouter();
const game = useGameStore();

const titleButton = computed(() => ({
  onClick: () => {
    game.init();
    router.push(ROUTES.gladiator);
  },
  label: LABELS.NEW_GAME,
  colorClasses: "bg-amber-600",
}));
</script>

<template>
  <PageContainer>
    <div class="flex flex-col justify-center items-center z-[1] w-100 mx-auto">
      <img :src="logo" />
      <Button v-bind="titleButton" />
    </div>
  </PageContainer>
</template>
