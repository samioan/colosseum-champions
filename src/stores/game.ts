import { defineStore } from "pinia";
import { ref } from "vue";
import type { Gladiator, Enemy, GameState } from "@/types";
import {
  createGladiator,
  createEnemy,
  selectGladiator,
  findGladiator,
  startActivity,
  handleTraining,
  handleFighting,
  handleResting,
  createMessage,
} from "@/utils";
import { INITIAL_RECRUITS, MAX_GLADIATORS, INTRO_MESSAGES } from "@/constants";

export const useGameStore = defineStore("game", () => {
  const gameState = ref<GameState>("titleScreen");
  const recruits = ref<Gladiator[]>(
    Array.from({ length: INITIAL_RECRUITS }, () => createGladiator())
  );
  const gladiators = ref<Gladiator[]>([]);
  const maxGladiators = ref<number>(MAX_GLADIATORS);
  const enemies = ref<Enemy[]>([]);

  function setGameState(state: GameState) {
    gameState.value = state;
  }

  function select(selectedGladiator: Gladiator) {
    selectGladiator(recruits, gladiators.value, selectedGladiator);
    // createEnemy(selectedGladiator.id, enemies.value, selectedGladiator.level);
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

    createMessage(gladiator.messages, INTRO_MESSAGES, id, gladiator.name);
    startActivity(
      gladiator,
      "isFighting",
      () => handleFighting(gladiator, enemies),
      gladiator.fightingTime
    );
  }

  function rest(id: string) {
    const gladiator = findGladiator(gladiators.value, id);
    if (!gladiator) return;

    startActivity(
      gladiator,
      "isResting",
      () => handleResting(gladiator),
      gladiator.restingTime
    );
  }

  function clearData() {
    recruits.value = Array.from({ length: INITIAL_RECRUITS }, () =>
      createGladiator()
    );
    gladiators.value = [];
    enemies.value = [];
  }

  return {
    recruits,
    gladiators,
    maxGladiators,
    enemies,
    gameState,
    setGameState,
    select,
    train,
    fight,
    rest,
    clearData,
  };
});
