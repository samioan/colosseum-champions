import getRandomRange from "@/utils/getRandomRange";
import createMessage from "@/utils/createMessage";
import createName from "@/utils/createName";
import rollChance from "@/utils/rollChance";
import performAbility from "@/utils/performAbility";
import { createEnemy, handleStat, createGladiator } from "@/utils/gladiators";
import {
  getExpForNextLevel,
  getActivityExp,
  checkForLevelUp,
  allocatePoint,
} from "@/utils/leveling";
import {
  setActivity,
  handleFighting,
  handleResting,
  handleTraining,
  handleFightingCalculations,
  handleDefeat,
  handleVictory,
  didEvade,
  calculateDamage,
} from "@/utils/activities";

export {
  getRandomRange,
  createEnemy,
  setActivity,
  handleStat,
  handleTraining,
  handleFighting,
  handleResting,
  getExpForNextLevel,
  getActivityExp,
  checkForLevelUp,
  allocatePoint,
  handleFightingCalculations,
  handleDefeat,
  handleVictory,
  didEvade,
  calculateDamage,
  createMessage,
  createName,
  createGladiator,
  rollChance,
  performAbility,
};
