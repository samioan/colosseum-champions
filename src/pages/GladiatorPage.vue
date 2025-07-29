<script setup lang="ts">
import { computed } from "vue";
import { storeToRefs } from "pinia";
import { endActivity, allocatePoint, createEnemy } from "@/utils";
import type { Gladiator } from "@/types";
import { useGameStore } from "@/stores/game";
import {
  TRAINING_LABELS,
  FIGHTING_LABELS,
  RESTING_LABELS,
  STAT_LABELS,
  ROUTES,
} from "@/constants";
import { GladiatorCard, PageContainer } from "@/components";
import { useRouter } from "vue-router";

const router = useRouter();
const game = useGameStore();

const { gladiators, enemies } = storeToRefs(game);

const gladiatorCardProps = computed(() => (gladiator: Gladiator) => ({
  headerProps: {
    name: gladiator.name,
    level: gladiator.level,
  },
  mainStats: [
    {
      label: STAT_LABELS.HEALTH,
      stat: gladiator.health,
      maxStat: gladiator.maxHealth,
      colorClass: "bg-red-500",
    },
    {
      label: STAT_LABELS.STAMINA,
      stat: gladiator.stamina,
      maxStat: gladiator.maxStamina,
      colorClass: "bg-green-500",
    },
    {
      label: STAT_LABELS.EXPERIENCE,
      stat: gladiator.experience,
      maxStat: gladiator.maxExperience,
      colorClass: "bg-blue-500",
    },
    {
      label: STAT_LABELS.GOLD,
      stat: gladiator.gold,
      colorClass: "bg-yellow-400",
    },
  ],
  extraStats: [
    {
      label: STAT_LABELS.VITALITY,
      stat: gladiator.vitality,
      showLevelUp: gladiator.points > 0,
      onClick: () =>
        allocatePoint(gladiator, [
          { statKey: "vitality", value: 1 },
          { statKey: "maxHealth", value: 10 },
          { statKey: "health", value: 10 },
        ]),
    },
    {
      label: STAT_LABELS.ENDURANCE,
      stat: gladiator.endurance,
      showLevelUp: gladiator.points > 0,
      onClick: () =>
        allocatePoint(gladiator, [
          { statKey: "endurance", value: 1 },
          { statKey: "maxStamina", value: 10 },
          { statKey: "stamina", value: 10 },
        ]),
    },
    {
      label: STAT_LABELS.STRENGTH,
      stat: gladiator.strength,
      showLevelUp: gladiator.points > 0,
      onClick: () =>
        allocatePoint(gladiator, [{ statKey: "strength", value: 1 }]),
    },
    {
      label: STAT_LABELS.DEFENSE,
      stat: gladiator.defense,
      showLevelUp: gladiator.points > 0,
      onClick: () =>
        allocatePoint(gladiator, [{ statKey: "defense", value: 1 }]),
    },
    {
      label: STAT_LABELS.DEXTERITY,
      stat: gladiator.dexterity,
      showLevelUp: gladiator.points > 0,
      onClick: () =>
        allocatePoint(gladiator, [{ statKey: "dexterity", value: 1 }]),
    },
  ],
  activityButtons: [
    {
      disabled:
        gladiator.isFighting || gladiator.isResting || gladiator.gold < 10,
      onClick: gladiator.isTraining
        ? () => endActivity(gladiator, "isTraining")
        : () => game.train(gladiator.id),
      label: gladiator.isTraining
        ? TRAINING_LABELS.stop
        : TRAINING_LABELS.start,
      colorClasses: "bg-green-600 text-white hover:bg-green-700",
    },
    {
      disabled:
        gladiator.isTraining || gladiator.isResting || gladiator.stamina < 5,
      onClick: gladiator.isFighting
        ? () => endActivity(gladiator, "isFighting")
        : () => {
            router.push(ROUTES.combat);
            createEnemy(gladiator.id, enemies.value, gladiator.level);
            game.fight(gladiator.id);
          },
      label: gladiator.isFighting
        ? FIGHTING_LABELS.stop
        : FIGHTING_LABELS.start,
      colorClasses: "bg-red-600 text-white hover:bg-red-700",
    },
    {
      disabled:
        gladiator.isFighting || gladiator.isTraining || gladiator.gold < 10,
      onClick: gladiator.isResting
        ? () => endActivity(gladiator, "isResting")
        : () => game.rest(gladiator.id),
      label: gladiator.isResting ? RESTING_LABELS.stop : RESTING_LABELS.start,
      colorClasses: "bg-yellow-500 text-gray-900 hover:bg-yellow-600",
    },
  ],
  points: gladiator.points,
}));
</script>

<template>
  <PageContainer custom-class="bg-[url(src/assets/dungeonBackground.jpg)]">
    <div class="flex flex-col justify-center mx-auto md:w-1/2 w-full z-[1]">
      <div v-for="gladiator in gladiators" class="flex flex-col justify-center">
        <GladiatorCard v-bind="gladiatorCardProps(gladiator)" />
      </div>
    </div>
  </PageContainer>
</template>
