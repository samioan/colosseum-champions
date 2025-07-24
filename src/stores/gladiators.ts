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
  const recruits = ref<Gladiator[]>(
    Array.from({ length: 4 }, () => createGladiator())
  );
  const gladiators = ref<Gladiator[]>([]);
  const maxGladiators = ref<number>(3);
  const enemies = ref<Enemy[]>([]);

  function select(selectedGladiator: Gladiator) {
    selectGladiator(recruits, gladiators.value, selectedGladiator);
    createEnemy(selectedGladiator.id, enemies.value, selectedGladiator.level);
    recruits.value.push(createGladiator());
  }

  function train(id: string) {
    const gladiator = findGladiator(gladiators.value, id);
    if (!gladiator) return;

    startActivity(
      gladiator,
      "isTraining",
      () => handleTraining(gladiator),
      gladiator.trainingTime
    );
  }

  function fight(id: string) {
    const gladiator = findGladiator(gladiators.value, id);
    if (!gladiator) return;

    startActivity(
      gladiator,
      "isFighting",
      () => handleFighting(gladiator, gladiators, enemies),
      gladiator.fightingTime
    );
  }

  const rest = (id: string) => {
    const gladiator = findGladiator(gladiators.value, id);
    if (!gladiator) return;

    startActivity(
      gladiator,
      "isResting",
      () => handleResting(gladiator),
      gladiator.restingTime
    );
  };

  return {
    recruits,
    gladiators,
    maxGladiators,
    enemies,
    select,
    train,
    fight,
    rest,
  };
});
