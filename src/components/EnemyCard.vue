<script setup lang="ts">
import { computed } from "vue";
import type { Enemy } from "@/types";
import { CardHeader, CardStatBar, CardContainer } from "@/components";

const props = defineProps<{
  enemy?: Enemy;
}>();

const headerProps = computed(() => ({
  name: `⚔️ ${props.enemy?.name}`,
  level: props.enemy?.level ?? 0,
}));

const mainStats = computed(() => [
  {
    label: "❤️ Health",
    stat: props.enemy?.health ?? 0,
    maxStat: props.enemy?.maxHealth ?? 0,
    colorClass: "bg-red-500",
  },
  {
    label: "⚡ Stamina",
    stat: props.enemy?.stamina ?? 0,
    maxStat: props.enemy?.maxStamina ?? 0,
    colorClass: "bg-green-500",
  },
]);
</script>

<template>
  <CardContainer>
    <CardHeader v-bind="headerProps" />

    <div class="flex-1 flex flex-col gap-3">
      <CardStatBar v-for="stat in mainStats" v-bind="stat" />

      <div class="flex items-center justify-between">
        <span class="font-medium">💪 Strength</span>
        <span>{{ enemy?.strength }}</span>
      </div>
    </div>
  </CardContainer>
</template>
