import type { Gladiator } from "@/types";
import {
  createBaseGladiator,
  getExpForNextLevel,
  getRandomRange,
} from "@/utils";

import {
  GLADIATORS_HEALTH_RANGES,
  GLADIATORS_STAMINA_RANGES,
  GLADIATORS_STRENGTH_RANGES,
  GLADIATORS_DEFENSE_RANGES,
  GLADIATORS_DEXTERITY_RANGES,
} from "@/constants";

export default function createGladiator() {
  const statRanges = {
    health: GLADIATORS_HEALTH_RANGES,
    stamina: GLADIATORS_STAMINA_RANGES,
    strength: GLADIATORS_STRENGTH_RANGES,
    defense: GLADIATORS_DEFENSE_RANGES,
    dexterity: GLADIATORS_DEXTERITY_RANGES,
  };

  const baseStats = createBaseGladiator(getRandomRange(3, 10), statRanges);

  const gladiator: Gladiator = {
    ...baseStats,
    experience: 0,
    maxExperience: getExpForNextLevel(100, 1.2, baseStats.level),
    points: 0,
    isTraining: false,
    isFighting: false,
    isResting: false,
    intervalId: undefined,
    trainingTime: 500,
    restingTime: 500,
    fightingTime: 1000,
    hasTurn: true,
    gold: 0,
    vitality: Math.floor(baseStats.maxHealth / 10),
    endurance: Math.floor(baseStats.maxStamina / 10),
  };

  return gladiator;
}
