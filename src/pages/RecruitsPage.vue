<script setup lang="ts">
import { computed } from "vue";
import { storeToRefs } from "pinia";
import type { Gladiator } from "@/types";
import { useGameStore } from "@/stores/game";
import { STAT_LABELS, ROUTES } from "@/constants";
import { RecruitCard, PageContainer } from "@/components";
import { useRouter } from "vue-router";

const router = useRouter();
const game = useGameStore();

const { recruits } = storeToRefs(game);

const recruitCardProps = computed(() => (gladiator: Gladiator) => {
  return {
    headerProps: {
      name: gladiator.name,
      level: gladiator.level,
    },
    mainStats: [
      {
        label: STAT_LABELS.HEALTH,
        stat: gladiator.health,
      },
      {
        label: STAT_LABELS.STAMINA,
        stat: gladiator.stamina,
      },
    ],
    extraStats: [
      {
        label: STAT_LABELS.STRENGTH,
        stat: gladiator.strength,
        showLevelUp: false,
      },
      {
        label: STAT_LABELS.DEFENSE,
        stat: gladiator.defense,
        showLevelUp: false,
      },
      {
        label: STAT_LABELS.DEXTERITY,
        stat: gladiator.dexterity,
        showLevelUp: false,
      },
    ],
    activityButtons: [
      {
        onClick: () => {
          game.select(gladiator);
          router.push(ROUTES.gladiator);
        },
        label: "Select Gladiator",
        colorClasses: "bg-amber-600 text-white hover:bg-amber-700",
      },
    ],
  };
});
</script>

<template>
  <PageContainer custom-class="bg-[url(src/assets/dungeonBackground.jpg)]">
    <div class="flex flex-col justify-center mx-auto md:w-1/2 w-full z-[1]">
      <RecruitCard
        v-for="gladiator in recruits"
        v-bind="recruitCardProps(gladiator)"
      />
    </div>
  </PageContainer>
</template>
