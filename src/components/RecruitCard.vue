<script setup lang="ts">
import { computed, ref } from "vue";
import type { Gladiator } from "@/types";
import {
  CardHeader,
  CardStatBar,
  CardContainer,
  CardButton,
  CardExtraStatsSection,
} from "@/components";

const props = defineProps<{
  gladiator: Gladiator;
  selectDisabled: boolean;
  onClickSelect: () => void;
  selectLabel: string;
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
]);

const activityButtons = computed(() => [
  {
    onClick: () => (showStats.value = !showStats.value),
    label: `${showStats.value ? "Hide Stats" : "Show Stats"}`,
    colorClasses: "bg-blue-500 hover:bg-blue-600",
  },
  {
    disabled: props.selectDisabled,
    onClick: props.onClickSelect,
    label: props.selectLabel,
    colorClasses: "bg-amber-600 text-white hover:bg-amber-700",
  },
]);

const extraStats = computed(() => [
  {
    label: "💪 Strength",
    stat: props.gladiator.strength,
  },
  {
    label: "🛡️ Defense",
    stat: props.gladiator.defense,
  },
  {
    label: "🎯 Defense",
    stat: props.gladiator.defense,
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

      <CardExtraStatsSection v-if="showStats" :extra-stats="extraStats" />
    </div>

    <div class="flex flex-col gap-2 mt-2">
      <CardButton v-for="button in activityButtons" v-bind="button" />
    </div>
  </CardContainer>
</template>
