import getRandomRange from "@/utils/getRandomRange";
import createMessage from "@/utils/createMessage";
import createName from "@/utils/createName";
import performAbility from "@/utils/performAbility";
import calculatePerks from "@/utils/calculatePerks";
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
  performAbility,
  calculatePerks,
};
