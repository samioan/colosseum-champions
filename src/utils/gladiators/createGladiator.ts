import type { Gladiator } from "@/types";
import { getRandomNumber } from "@/utils";
import { v4 as uuidv4 } from "uuid";

export default function createGladiator() {
  const health = getRandomNumber(50, 100);
  const stamina = getRandomNumber(50, 100);

  const gladiator: Gladiator = {
    id: uuidv4(),
    name: (Math.random() + 1).toString(36).substring(7),
    strength: getRandomNumber(5, 10),
    health: health,
    maxHealth: health,
    stamina: stamina,
    maxStamina: stamina,
    experience: 0,
    maxExperience: 100,
    level: 1,
    points: 0,
    isTraining: false,
    isFighting: false,
    isResting: false,
    intervalId: undefined,
    trainingTime: 1000,
    restingTime: 1000,
    fightingTime: 1000,
    fightingMatches: 0,
    trainingDays: 0,
    restingDays: 0,
    maxFightingMatches: 5,
    maxTrainingDays: 5,
    maxRestingDays: 5,
  };

  return gladiator;
}
