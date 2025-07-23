<script setup lang="ts">
import { useGladiatorsStore } from "@stores/gladiators";
import { storeToRefs } from "pinia";
import {
  GladiatorCard,
  RecruitCard,
  EnemyCard,
  RecruitDrawer,
} from "@/components";
import { endActivity } from "@/utils";
import { computed, ref } from "vue";
import type { Gladiator } from "@/types";

const gladiatorsStore = useGladiatorsStore();

const {
  gladiators,
  selectedGladiators,
  maxSelectedGladiators,
  enemyGladiators,
} = storeToRefs(gladiatorsStore);

const drawerOpen = ref(false);

const recruitProps = computed(() => (gladiator: Gladiator) => ({
  gladiator: gladiator,
  selectDisabled:
    selectedGladiators.value.length === maxSelectedGladiators.value,
  onClickSelect: () => gladiatorsStore.select(gladiator),
  selectLabel: "Select Gladiator",
}));

const gladiatorProps = computed(() => (gladiator: Gladiator) => ({
  gladiator: gladiator,
  trainingDisabled:
    gladiator.isFighting ||
    gladiator.isResting ||
    gladiator.trainingDays >= gladiator.maxTrainingDays,
  onClickTraining: gladiator.isTraining
    ? () => endActivity(gladiator, "isTraining")
    : () => gladiatorsStore.train(gladiator.id),
  trainingLabel: gladiator.isTraining ? "Stop Training" : "Start Training",
  fightingDisabled:
    gladiator.isTraining ||
    gladiator.isResting ||
    gladiator.fightingMatches >= gladiator.maxFightingMatches,
  onClickFighting: gladiator.isFighting
    ? () => endActivity(gladiator, "isFighting")
    : () => gladiatorsStore.fight(gladiator.id),
  fightingLabel: gladiator.isFighting ? "Stop Fighting" : "Start Fighting",
  restingDisabled:
    gladiator.isFighting ||
    gladiator.isTraining ||
    gladiator.restingDays >= gladiator.maxRestingDays,
  onClickResting: gladiator.isResting
    ? () => endActivity(gladiator, "isResting")
    : () => gladiatorsStore.rest(gladiator.id),
  restingLabel: gladiator.isResting ? "Stop Resting" : "Start Resting",
}));

const drawerProps = computed(() => ({
  open: drawerOpen.value,
  gladiators: gladiators.value,
  selectDisabled:
    selectedGladiators.value.length === maxSelectedGladiators.value,
  onClickSelect: (gladiator: Gladiator) => gladiatorsStore.select(gladiator),
  selectLabel: "Select Gladiator",
  closeDrawer: () => (drawerOpen.value = false),
}));

function toggleDrawer() {
  drawerOpen.value = !drawerOpen.value;
}
</script>

<template>
  <div class="flex">
    <button
      @click="toggleDrawer"
      class="absolute right-0 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
    >
      {{ drawerOpen ? "Close Recruits" : "Show Recruits" }}
    </button>
    <RecruitDrawer v-bind="drawerProps" />
    <div class="flex flex-col items-center min-w-[140px]">
      <div v-for="gladiator in gladiators">
        <RecruitCard v-bind="recruitProps(gladiator)" />
      </div>
    </div>
    <div class="flex flex-col items-center min-w-[140px]">
      <div v-for="gladiator in selectedGladiators" class="flex">
        <GladiatorCard v-bind="gladiatorProps(gladiator)" />
        <EnemyCard
          :gladiator="enemyGladiators.find((g) => g.id === gladiator.id)"
        />
      </div>
    </div>
  </div>
</template>
