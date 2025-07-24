<script setup lang="ts">
import { computed, ref } from "vue";
import { storeToRefs } from "pinia";
import { endActivity } from "@/utils";
import type { Gladiator } from "@/types";
import { useGladiatorsStore } from "@stores/gladiators";
import { TRAINING_LABELS, FIGHTING_LABELS, RESTING_LABELS } from "@/constants";
import {
  GladiatorCard,
  RecruitCard,
  EnemyCard,
  RecruitDrawer,
} from "@/components";

const gladiatorsStore = useGladiatorsStore();

const { recruits, gladiators, maxGladiators, enemies } =
  storeToRefs(gladiatorsStore);

const drawerOpen = ref(false);

const recruitProps = computed(() => (gladiator: Gladiator) => ({
  gladiator: gladiator,
  selectDisabled: gladiators.value.length === maxGladiators.value,
  onClickSelect: () => gladiatorsStore.select(gladiator),
  selectLabel: "Select Gladiator",
}));

const gladiatorProps = computed(() => (gladiator: Gladiator) => ({
  gladiator: gladiator,
  trainingDisabled: gladiator.isFighting || gladiator.isResting,
  onClickTraining: gladiator.isTraining
    ? () => endActivity(gladiator, "isTraining")
    : () => gladiatorsStore.train(gladiator.id),
  trainingLabel: gladiator.isTraining
    ? TRAINING_LABELS.stop
    : TRAINING_LABELS.start,
  fightingDisabled: gladiator.isTraining || gladiator.isResting,
  onClickFighting: gladiator.isFighting
    ? () => endActivity(gladiator, "isFighting")
    : () => gladiatorsStore.fight(gladiator.id),
  fightingLabel: gladiator.isFighting
    ? FIGHTING_LABELS.stop
    : FIGHTING_LABELS.start,
  restingDisabled: gladiator.isFighting || gladiator.isTraining,
  onClickResting: gladiator.isResting
    ? () => endActivity(gladiator, "isResting")
    : () => gladiatorsStore.rest(gladiator.id),
  restingLabel: gladiator.isResting
    ? RESTING_LABELS.stop
    : RESTING_LABELS.start,
}));

const drawerProps = computed(() => ({
  open: drawerOpen.value,
  gladiators: recruits.value,
  selectDisabled: gladiators.value.length === maxGladiators.value,
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
      <div v-for="gladiator in recruits">
        <RecruitCard v-bind="recruitProps(gladiator)" />
      </div>
    </div>
    <div class="flex flex-col items-center min-w-[140px]">
      <div v-for="gladiator in gladiators" class="flex">
        <GladiatorCard v-bind="gladiatorProps(gladiator)" />
        <EnemyCard :enemy="enemies.find((g) => g.id === gladiator.id)" />
      </div>
    </div>
  </div>
</template>
