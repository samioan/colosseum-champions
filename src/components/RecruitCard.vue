<script setup lang="ts">
import {
  CardHeader,
  CardStatBar,
  CardContainer,
  CardButton,
  CardExtraStatsSection,
} from "@/components";

defineProps<{
  headerProps: {
    name: string;
    level: number;
  };
  mainStats: {
    label: string;
    stat: number;
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
}>();
</script>

<template>
  <CardContainer>
    <CardHeader v-bind="headerProps" />
    <div class="flex gap-4">
      <div class="flex-1 flex flex-col gap-3">
        <CardStatBar v-for="stat in mainStats" v-bind="stat" />
      </div>

      <CardExtraStatsSection :extra-stats="extraStats" />
    </div>

    <div class="flex flex-col gap-2 mt-2">
      <CardButton v-for="button in activityButtons" v-bind="button" />
    </div>
  </CardContainer>
</template>
