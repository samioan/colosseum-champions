<script setup lang="ts">
import { ref, computed } from "vue";
import type { Gladiator } from "@/types";
import {
  CardHeader,
  CardStatBar,
  CardButton,
  CardContainer,
  CardExtraStatsSection,
} from "@/components";
import { allocatePoint } from "@/utils";

const props = defineProps<{
  gladiator: Gladiator;
  trainingDisabled: boolean;
  onClickTraining: () => void;
  trainingLabel: string;
  fightingDisabled: boolean;
  onClickFighting: () => void;
  fightingLabel: string;
  restingDisabled: boolean;
  onClickResting: () => void;
  restingLabel: string;
}>();

const showStats = ref(false);

const headerProps = computed(() => ({
  name: `🏛️ ${props.gladiator.name}`,
  level: props.gladiator.level,
}));

const mainStats = computed(() => [
  {
    label: "❤️ Health",
    stat: props.gladiator.health,
    maxStat: props.gladiator.maxHealth,
    colorClass: "bg-red-500",
  },
  {
    label: "⚡ Stamina",
    stat: props.gladiator.stamina,
    maxStat: props.gladiator.maxStamina,
    colorClass: "bg-green-500",
  },
  {
    label: "⭐ Experience",
    stat: props.gladiator.experience,
    maxStat: props.gladiator.maxExperience,
    colorClass: "bg-blue-500",
  },
]);

const extraStats = computed(() => [
  {
    label: "💪 Strength",
    stat: props.gladiator.strength,
    disabled: props.gladiator.points <= 0,
    onClick: () => allocatePoint(props.gladiator, "strength", 1),
  },
  {
    label: "🛡️ Defense",
    stat: props.gladiator.defense,
    disabled: props.gladiator.points <= 0,
    onClick: () => allocatePoint(props.gladiator, "defense", 1),
  },
  {
    label: "🎯 Defense",
    stat: props.gladiator.defense,
    disabled: props.gladiator.points <= 0,
    onClick: () => allocatePoint(props.gladiator, "defense", 1),
  },
]);

const activityButtons = computed(() => [
  {
    onClick: () => (showStats.value = !showStats.value),
    label: `${showStats.value ? "Hide Stats" : "Show Stats"} ${
      props.gladiator.points ? "⏫" : ""
    }`,
    colorClasses: "bg-blue-500 hover:bg-blue-600",
  },
  {
    disabled: props.trainingDisabled,
    onClick: props.onClickTraining,
    label: props.trainingLabel,
    colorClasses: "bg-green-600 text-white hover:bg-green-700",
  },
  {
    disabled: props.fightingDisabled,
    onClick: props.onClickFighting,
    label: props.fightingLabel,
    colorClasses: "bg-red-600 text-white hover:bg-red-700",
  },
  {
    disabled: props.restingDisabled,
    onClick: props.onClickResting,
    label: props.restingLabel,
    colorClasses: "bg-yellow-500 text-gray-900 hover:bg-yellow-600",
  },
]);
</script>

<template>
  <CardContainer>
    <CardHeader v-bind="headerProps" />

    <div class="flex gap-4">
      <div class="flex-1 flex flex-col gap-3">
        <CardStatBar v-for="stat in mainStats" v-bind="stat" />
      </div>

      <CardExtraStatsSection
        v-if="showStats"
        :points="gladiator.points"
        :extra-stats="extraStats"
      />
    </div>

    <div class="flex flex-col gap-2 mt-2">
      <CardButton v-for="button in activityButtons" v-bind="button" />
    </div>
  </CardContainer>
</template>
