import { defineStore } from "pinia";
import { ref } from "vue";
import type { Gladiator, Enemy } from "@/types";
import {
  createGladiator,
  createEnemy,
  selectGladiator,
  findGladiator,
  startActivity,
  handleTraining,
  handleFighting,
  handleResting,
} from "@/utils";

export const useGladiatorsStore = defineStore("gladiators", () => {
  const gladiators = ref<Gladiator[]>(
    Array.from({ length: 4 }, () => createGladiator())
  );
  const selectedGladiators = ref<Gladiator[]>([]);
  const maxSelectedGladiators = ref<number>(3);
  const enemyGladiators = ref<Enemy[]>([]);

  function select(selectedGladiator: Gladiator) {
    selectGladiator(gladiators, selectedGladiators.value, selectedGladiator);
    createEnemy(selectedGladiator.id, enemyGladiators.value);
    gladiators.value.push(createGladiator());
  }

  function train(id: string) {
    const gladiator = findGladiator(selectedGladiators.value, id);
    if (!gladiator) return;

    startActivity(
      gladiator,
      "isTraining",
      () => handleTraining(gladiator),
      gladiator.trainingTime
    );
  }

  function fight(id: string) {
    const gladiator = findGladiator(selectedGladiators.value, id);
    if (!gladiator) return;

    startActivity(
      gladiator,
      "isFighting",
      () => handleFighting(gladiator, selectedGladiators, enemyGladiators),
      gladiator.fightingTime
    );
  }

  const rest = (id: string) => {
    const gladiator = findGladiator(selectedGladiators.value, id);
    if (!gladiator) return;

    startActivity(
      gladiator,
      "isResting",
      () => handleResting(gladiator),
      gladiator.restingTime
    );
  };

  return {
    gladiators,
    selectedGladiators,
    maxSelectedGladiators,
    enemyGladiators,
    select,
    train,
    fight,
    rest,
  };
});
