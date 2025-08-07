<script setup lang="ts">
import { computed } from "vue";
import { Button } from "@/components";
import { logo } from "@/assets";
import { useRouter } from "vue-router";
import { ROUTES, LABELS } from "@/constants";
import { usePlayerStore } from "@/stores";
import { createGladiator } from "@/utils";

const router = useRouter();
const playerStore = usePlayerStore();

const titleButton = computed(() => ({
  onClick: () => {
    playerStore.player = createGladiator();
    router.push(ROUTES.gladiator);
  },
  label: LABELS.newGame,
  colorClasses: "bg-amber-600",
}));
</script>

<template>
  <div class="flex min-w-screen min-h-screen">
    <div class="flex flex-col justify-center items-center z-[1] w-100 mx-auto">
      <img :src="logo" />
      <Button v-bind="titleButton" />
    </div>
  </div>
</template>
