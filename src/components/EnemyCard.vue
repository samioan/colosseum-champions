<script setup lang="ts">
import { CardHeader, CardStatBar, CardContainer } from "@/components";

defineProps<{
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
}>();
</script>

<template>
  <CardContainer>
    <div>
      <CardHeader v-bind="headerProps" />
      <div class="flex-1 flex flex-col gap-3">
        <CardStatBar v-for="stat in mainStats" v-bind="stat" />
      </div>
    </div>
  </CardContainer>
</template>
