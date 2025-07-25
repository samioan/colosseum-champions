import getRandomRange from "@/utils/getRandomRange";
import createMessage from "@/utils/createMessage";
import {
  createGladiator,
  createEnemy,
  selectGladiator,
  findGladiator,
  handleStat,
  removeGladiator,
  createBaseGladiator,
  findEnemy,
  removeEnemy,
} from "@/utils/gladiators";
import {
  getExpForNextLevel,
  getActivityExp,
  checkForLevelUp,
  allocatePoint,
} from "@/utils/leveling";
import {
  endActivity,
  handleFighting,
  handleResting,
  handleTraining,
  startActivity,
  handleFightingCalculations,
  handleDefeat,
  handleVictory,
  didEvade,
  calculateDamage,
} from "@/utils/activities";

export {
  getRandomRange,
  createGladiator,
  createEnemy,
  selectGladiator,
  endActivity,
  findGladiator,
  startActivity,
  handleStat,
  handleTraining,
  handleFighting,
  handleResting,
  removeGladiator,
  getExpForNextLevel,
  getActivityExp,
  checkForLevelUp,
  createBaseGladiator,
  allocatePoint,
  handleFightingCalculations,
  handleDefeat,
  handleVictory,
  didEvade,
  calculateDamage,
  findEnemy,
  removeEnemy,
  createMessage,
};
