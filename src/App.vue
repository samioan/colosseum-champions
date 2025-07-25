<script setup lang="ts">
import { computed } from "vue";
import { storeToRefs } from "pinia";
import { endActivity, allocatePoint } from "@/utils";
import type { Gladiator } from "@/types";
import { useGladiatorsStore } from "@stores/gladiators";
import { TRAINING_LABELS, FIGHTING_LABELS, RESTING_LABELS } from "@/constants";
import {
  GladiatorCard,
  RecruitCard,
  EnemyCard,
  CombatBoard,
} from "@/components";

const gladiatorsStore = useGladiatorsStore();

const { recruits, gladiators, maxGladiators, enemies } =
  storeToRefs(gladiatorsStore);

const recruitCardProps = computed(() => (gladiator: Gladiator) => {
  return {
    headerProps: {
      name: `🏛️ ${gladiator.name}`,
      level: gladiator.level,
    },
    mainStats: [
      {
        label: "❤️ Health",
        stat: gladiator.health,
        maxStat: gladiator.maxHealth,
        colorClass: "bg-red-500",
      },
      {
        label: "⚡ Stamina",
        stat: gladiator.stamina,
        maxStat: gladiator.maxStamina,
        colorClass: "bg-green-500",
      },
    ],
    activityButtons: [
      {
        disabled: gladiators.value.length === maxGladiators.value,
        onClick: () => gladiatorsStore.select(gladiator),
        label: "Select Gladiator",
        colorClasses: "bg-amber-600 text-white hover:bg-amber-700",
      },
    ],
    extraStats: [
      {
        label: "💪 Strength",
        stat: gladiator.strength,
      },
      {
        label: "🛡️ Defense",
        stat: gladiator.defense,
      },
      {
        label: "🎯 Defense",
        stat: gladiator.defense,
      },
    ],
  };
});

const enemyCardProps = computed(() => (gladiator: Gladiator) => {
  const enemy = enemies.value.find((g) => g.gladiatorId === gladiator.id);

  return {
    headerProps: {
      name: `⚔️ ${enemy?.name}`,
      level: enemy?.level ?? 0,
    },
    mainStats: [
      {
        label: "❤️ Health",
        stat: enemy?.health ?? 0,
        maxStat: enemy?.maxHealth ?? 0,
        colorClass: "bg-red-500",
      },
      {
        label: "⚡ Stamina",
        stat: enemy?.stamina ?? 0,
        maxStat: enemy?.maxStamina ?? 0,
        colorClass: "bg-green-500",
      },
    ],
  };
});

const gladiatorCardProps = computed(() => (gladiator: Gladiator) => ({
  headerProps: {
    name: `🏛️ ${gladiator.name}`,
    level: gladiator.level,
  },
  mainStats: [
    {
      label: "❤️ Health",
      stat: gladiator.health,
      maxStat: gladiator.maxHealth,
      colorClass: "bg-red-500",
    },
    {
      label: "⚡ Stamina",
      stat: gladiator.stamina,
      maxStat: gladiator.maxStamina,
      colorClass: "bg-green-500",
    },
    {
      label: "⭐ Experience",
      stat: gladiator.experience,
      maxStat: gladiator.maxExperience,
      colorClass: "bg-blue-500",
    },
  ],
  extraStats: [
    {
      label: "💪 Strength",
      stat: gladiator.strength,
      disabled: gladiator.points <= 0,
      onClick: () => allocatePoint(gladiator, "strength", 1),
    },
    {
      label: "🛡️ Defense",
      stat: gladiator.defense,
      disabled: gladiator.points <= 0,
      onClick: () => allocatePoint(gladiator, "defense", 1),
    },
    {
      label: "🎯 Dexterity",
      stat: gladiator.dexterity,
      disabled: gladiator.points <= 0,
      onClick: () => allocatePoint(gladiator, "dexterity", 1),
    },
  ],
  activityButtons: [
    {
      disabled: gladiator.isFighting || gladiator.isResting,
      onClick: gladiator.isTraining
        ? () => endActivity(gladiator, "isTraining")
        : () => gladiatorsStore.train(gladiator.id),
      label: gladiator.isTraining
        ? TRAINING_LABELS.stop
        : TRAINING_LABELS.start,
      colorClasses: "bg-green-600 text-white hover:bg-green-700",
    },
    {
      disabled: gladiator.isTraining || gladiator.isResting,
      onClick: gladiator.isFighting
        ? () => endActivity(gladiator, "isFighting")
        : () => gladiatorsStore.fight(gladiator.id),
      label: gladiator.isFighting
        ? FIGHTING_LABELS.stop
        : FIGHTING_LABELS.start,
      colorClasses: "bg-red-600 text-white hover:bg-red-700",
    },
    {
      disabled: gladiator.isFighting || gladiator.isTraining,
      onClick: gladiator.isResting
        ? () => endActivity(gladiator, "isResting")
        : () => gladiatorsStore.rest(gladiator.id),
      label: gladiator.isResting ? RESTING_LABELS.stop : RESTING_LABELS.start,
      colorClasses: "bg-yellow-500 text-gray-900 hover:bg-yellow-600",
    },
  ],
  points: gladiator.points,
}));

const messages = computed(() => (gladiator: Gladiator) => ({
  gladiatorId: gladiator.id,
  messages: [
    ...gladiator.messages,
    ...(enemies.value.find((g) => g.gladiatorId === gladiator.id)?.messages ??
      []),
  ].sort((a, b) => b.time - a.time),
}));
</script>

<template>
  <div class="flex">
    <div class="flex flex-col items-center min-w-[140px]">
      <div v-for="gladiator in recruits">
        <RecruitCard v-bind="recruitCardProps(gladiator)" />
      </div>
    </div>
    <div class="flex flex-col items-center min-w-[140px]">
      <div v-for="gladiator in gladiators" class="flex h-[416px]">
        <GladiatorCard v-bind="gladiatorCardProps(gladiator)" />
        <CombatBoard v-bind="messages(gladiator)" />
        <EnemyCard v-bind="enemyCardProps(gladiator)" />
      </div>
    </div>
  </div>
</template>
