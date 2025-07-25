<script setup lang="ts">
import { ref, computed } from "vue";
import {
  CardHeader,
  CardStatBar,
  CardButton,
  CardContainer,
  CardExtraStatsSection,
} from "@/components";

const props = defineProps<{
  headerProps: {
    name: string;
    level: number;
  };
  mainStats: {
    label: string;
    stat: number;
    maxStat: number;
    colorClass: string;
  }[];
  activityButtons: {
    disabled?: boolean;
    onClick: () => void;
    label: string;
    colorClasses: string;
  }[];
  extraStats: {
    label: string;
    stat: number;
  }[];
  points: number;
}>();

const showStats = ref(false);

const showStatsButton = computed(() => ({
  onClick: () => (showStats.value = !showStats.value),
  label: `${showStats.value ? "Hide Stats" : "Show Stats"} ${
    props.points ? "⏫" : ""
  }`,
  colorClasses: "bg-blue-500 hover:bg-blue-600",
}));
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
        :points="points"
        :extra-stats="extraStats"
      />
    </div>

    <div class="flex flex-col gap-2 mt-2">
      <CardButton v-bind="showStatsButton" />
      <CardButton v-for="button in activityButtons" v-bind="button" />
    </div>
  </CardContainer>
</template>
